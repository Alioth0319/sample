import { Injectable, Logger } from '@nestjs/common';
import axios, { AxiosError } from 'axios';
import { RNews } from 'src/database/entities/r-new.entity';
import { ONews } from 'src/database/entities/o-new.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class DeepseekService {
  private readonly logger = new Logger(DeepseekService.name);
  private readonly deepSeekApiKey: string;
  private readonly deepSeekApiUrl: string;

  constructor(
    @InjectRepository(RNews)
    private readonly dataController: Repository<RNews>,
    @InjectRepository(ONews)
    private readonly oNewsRepository: Repository<ONews>,
  ) {
    this.deepSeekApiKey = process.env.DEEPSEEK_API_KEY || 'sk-3f0ff213ae9447728b6c495bbba236a5';
    this.deepSeekApiUrl = process.env.DEEPSEEK_API_URL || 'https://api.deepseek.com/chat/completions';
  }

  // 读取 ONews 的 text 内容
  async getONewsText(oNewsId: string): Promise<string> {
    try {
      const oNews = await this.oNewsRepository.findOne({
        where: { oNews_id: oNewsId },
      });

      if (!oNews) {
        throw new Error(`ONews record with ID ${oNewsId} not found`);
      }

      return oNews.text;
    } catch (error) {
      this.logger.error(`Failed to fetch ONews text: ${error.message}`);
      throw error;
    }
  }

  async askQuestion(question = "请重写一下整个文本：", oNewsId?: string): Promise<string> {
    let fullQuestion = question;

    if (oNewsId) {
      try {
        const oNewsText = await this.getONewsText(oNewsId);
        fullQuestion = `${question}\n\nContext from ONews:\n${oNewsText}`;
      } catch (error) {
        this.logger.error(`Error merging ONews text: ${error.message}`);
      }
    }

    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${this.deepSeekApiKey}`,
    };

    const data = {
      model: 'deepseek-chat',
      messages: [
        {
          role: 'user',
          content: fullQuestion,
        },
      ],
    };

    try {
      const response = await axios.post(this.deepSeekApiUrl, data, { headers });

      if (response.data?.choices?.[0]?.message) {
        const dataEntity = new RNews();
        dataEntity.rNews_id = uuidv4(); // ✅ 确保主键赋值
        dataEntity.text_r = response.data.choices[0].message.content;
        dataEntity.created_on_r = new Date();
        dataEntity.updated_on_r = new Date();

        this.logger.log('Saving RNews entity:', JSON.stringify(dataEntity));
        await this.dataController.save(dataEntity);

        return response.data.choices[0].message.content;
      } else {
        throw new Error('Unexpected response structure from DeepSeek API');
      }
    } catch (error) {
      this.handleError(error);
    }
  }

  // 处理错误
  private handleError(error: AxiosError | any): never {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;

      // 输出错误响应数据
      if (axiosError.response) {
        this.logger.error(`Axios Error calling DeepSeek API: ${axiosError.message}`, {
          status: axiosError.response.status,
          data: axiosError.response.data,
        });

        // 如果是 400 错误，返回错误响应的详细信息
        if (axiosError.response.status === 400) {
          this.logger.error(`Bad Request (400) from DeepSeek API: ${JSON.stringify(axiosError.response.data)}`);
        }
      } else {
        this.logger.error(`Axios Error calling DeepSeek API: ${axiosError.message}`);
      }

      // 重新抛出错误，以便上层捕获
      throw new Error(`Axios Error communicating with DeepSeek API: ${axiosError.message}`);
    } else {
      this.logger.error(`Unexpected Error calling DeepSeek API: ${error.message}`);
      throw new Error(`Unexpected Error communicating with DeepSeek API: ${error.message}`);
    }
  }
}