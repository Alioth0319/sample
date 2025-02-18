import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import * as cheerio from 'cheerio';
import { ONews } from 'src/database/entities/o-new.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CrawlerService {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(ONews)
    private readonly articleRepository: Repository<ONews>,
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

      // 提取数据
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

      // 清理内容
      $('script, style, link[rel="stylesheet"], iframe').remove();
      const article = this.cleanText($('body').text());

      // 保存到数据库（不操作 oNews_id）
      await this.articleRepository.save({ url, title, text: article });

      return { title, links, article };
    } catch (error) {
      throw new Error(`Failed to process: ${error.message}`);
    }
  }
}