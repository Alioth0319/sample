import { Injectable, Logger } from '@nestjs/common';
import axios, { AxiosError } from 'axios';
import { RNews } from 'src/r-news/entities/r-new.entity';
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
    private readonly dataController: Repository<RNews>, // 确保注入了正确的 repository
  ) {
    this.deepSeekApiKey = process.env.DEEPSEEK_API_KEY || 'sk-3f0ff213ae9447728b6c495bbba236a5'; // 从环境变量中获取 API 密钥
    this.deepSeekApiUrl = process.env.DEEPSEEK_API_URL || 'https://api.deepseek.com/chat/completions'; // 从环境变量中获取 API URL，如果未设置则使用默认值
  }

  // 向 DeepSeek 提问
  async askQuestion(question: string): Promise<string> {
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
          content: question,
        },
      ],
    };

    // 打印请求数据和头部
    this.logger.log('Request Data:', JSON.stringify(data));
    this.logger.log('Request Headers:', JSON.stringify(headers));

    try {
      const response = await axios.post(this.deepSeekApiUrl, data, { headers });

      // 打印响应数据
      this.logger.log('Response Data:', JSON.stringify(response.data));

      // 确保响应数据正确并且包含 choices 和 message
      if (response.data && response.data.choices && response.data.choices.length > 0 && response.data.choices[0].message) {
        const dataEntity = new RNews();
        dataEntity.rNews_id = uuidv4();
        dataEntity.text_r = response.data.choices[0].message.content;  // 保存回答
        dataEntity.created_on_r = new Date();
        dataEntity.updated_on_r = new Date();

        // 将数据保存到数据库
        await this.dataController.save(dataEntity); // 修改此行为 dataController
        return response.data.choices[0].message.content; // 返回 DeepSeek API 返回的内容
      } else {
        throw new Error('Unexpected response structure from DeepSeek API: missing "choices" or "message" field');
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