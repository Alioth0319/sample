import { Controller, Get, Query } from '@nestjs/common';
import { CrawlerService } from './crawler.service';

@Controller('crawler')
export class CrawlerController {
  constructor(private readonly crawlerService: CrawlerService) {}

  @Get('scrape')
  async scrape(@Query('url') url: string) {
    if (!url) {
      return { error: 'URL is required' };
    }

    try {
      const result = await this.crawlerService.scrape(url);
      return result;
    } catch (error) {
      return { error: error.message };
    }
  }

  @Get('article')
  async scrapeText(@Query('url') url: string) {
    if (!url) {
      return { error: 'URL is required' };
    }

    try {
      const article = await this.crawlerService.scrapeText(url.replace(/\s+/g, ' ').trim() );
      return { article };
    } catch (error) {
      return { error: error.message };
    }
  }
}