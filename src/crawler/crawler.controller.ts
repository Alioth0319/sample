import { Controller, Get, Query } from '@nestjs/common';
import { CrawlerService } from './crawler.service';

@Controller('crawler')
export class CrawlerController {
  constructor(private readonly crawlerService: CrawlerService) {}

  /**
   * 完整爬取接口（包含标题、链接、正文和数据库存储）
   */
  @Get('scrape')
  async scrape(@Query('url') url: string) {
    if (!url) {
      return { error: 'URL is required' };
    }

    try {
      const result = await this.crawlerService.scrape(url);
      return {
        success: true,
        data: {
          title: result.title,
          links: result.links,
          article: result.article,
          message: '数据已存储到数据库'
        }
      };
    } catch (error) {
      return { 
        success: false,
        error: error.message 
      };
    }
  }

  /**
   * 仅获取正文内容（不存储数据库）
   */
  @Get('article')
  async getArticle(@Query('url') url: string) {
    if (!url) {
      return { error: 'URL is required' };
    }

    try {
      // 直接复用 scrape 方法中的正文提取逻辑
      const result = await this.crawlerService.scrape(url);
      return {
        success: true,
        article: result.article
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
}