import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios'; // 确保导入 HttpService
import { firstValueFrom } from 'rxjs';
import * as cheerio from 'cheerio';

@Injectable()
export class CrawlerService {
  scrapeText(url: string) {
      throw new Error('Method not implemented.');
  }
  constructor(private readonly httpService: HttpService) {} // 确保 HttpService 被注入
  
  private cleanText(text: string): string {
    // 移除 JavaScript 代码片段
    text = text.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

    // 移除 HTML 标签
    text = text.replace(/<[^>]+>/g, '');

    // 移除多余的空白字符
    text = text.replace(/\s+/g, ' ').trim();

    return text;
  }

  async scrape(url: string): Promise<{ title: string; links: string[]; article: string }> {
    try {
      // 使用 HttpService 发送 HTTP 请求
      const { data } = await firstValueFrom(this.httpService.get(url));

      // 使用 cheerio 加载 HTML
      const $ = cheerio.load(data);

      // 获取网页标题
      const title = $('title').text();

      // 获取所有链接
      const links: string[] = [];
      $('a').each((_, element) => {
        const href = $(element).attr('href');
        if (href) {
          links.push(href);
        }
      });

      // 移除不需要的脚本标签
      $('script').remove();

      // 移除不需要的其他元素（如样式、iframe 等）
      $('style, link[rel="stylesheet"], iframe').remove();

      // 获取 <body> 内的所有文本
      const article = $('body').text();

      // 返回清理后的数据
      return { title, links, article: this.cleanText(article) };
    } catch (error) {
      throw new Error(`Failed to scrape the website: ${error.message}`);
    }
  }
}