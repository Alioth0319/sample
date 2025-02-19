import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import * as cheerio from 'cheerio';
import { ONews } from 'src/database/entities/o-new.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeepseekService } from 'src/deepseek/deepseek.service';
import { RNews } from 'src/database/entities/r-new.entity';

@Injectable()
export class CrawlerService {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(ONews)
    private readonly oNewsRepository: Repository<ONews>,  // 确保注入 ONews 的 Repository
    @InjectRepository(RNews)
    private readonly rNewsRepository: Repository<RNews>,   // 注入 RNews 的 Repository
    private readonly deepseekService: DeepseekService,
  ) {}

  private cleanText(article: string): string {
    article = article.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    article = article.replace(/<[^>]+>/g, '');
    return article.replace(/\s+/g, ' ').trim();
  }

  async scrape(url: string): Promise<{ title: string; links: string[]; article: string }> {
    try {
      const { data } = await firstValueFrom(this.httpService.get(url));
      const $ = cheerio.load(data);

      // 1. 提取数据
      const title = $('title').text();
      const links: string[] = [];
      const baseUrl = new URL(url).origin;
      $('a').each((_, element) => {
        let href = $(element).attr('href');
        if (href) {
          href = href.startsWith('http') ? href : new URL(href, baseUrl).href;
          links.push(href);
        }
      });

      // 2. 清理内容
      $('script, style, link[rel="stylesheet"], iframe').remove();
      const article = this.cleanText($('body').text());

      // 3. 保存到 ONews
      const savedONews = await this.oNewsRepository.save({
        url,
        title,
        text: article,
      });

      // 4. 调用 DeepseekService 重写文本并保存到 RNews
      const generatedText = await this.deepseekService.askQuestion(
        '请重写以下新闻：', 
        savedONews.oNews_id  // 传递 ONews 的主键
      );

      // 5. 返回原始数据
      return { title, links, article };
    } catch (error) {
      throw new Error(`Failed to process: ${error.message}`);
    }
  }
}