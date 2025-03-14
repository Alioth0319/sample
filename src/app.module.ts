import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ONewsModule } from './o-news/o-news.module';
import { CategoriesModule } from './categories/categories.module';
import { RNewsModule } from './r-news/r-news.module';
import { DateModule } from './nDate/nDate.module';
import { FeedModule } from './feed/feed.module';
import { HeadlineModule } from './headline/headline.module';
import { ONews } from './database/entities/o-new.entity';
import { RNews } from './database/entities/r-new.entity';
import { Feed } from './database/entities/feed.entity';
import { Categories } from './database/entities/category.entity';
import { Headline } from './database/entities/headline.entity';
import { NDate } from './database/entities/nDate.entity';
import { DeepseekService } from './deepseek/deepseek.service';
import { DeepSeekController } from 'src/deepseek/deepseek.controller';
import { CrawlerService } from './crawler/crawler.service';
import { HttpModule } from '@nestjs/axios';
import { CrawlerController } from './crawler/crawler.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 20103,
      password: '20020103',
      username: 'postgres',
      entities: [ONews, RNews, Feed, Categories, NDate, Headline],
      database: 'DatabaseT',
      synchronize: true,
      logging: true,
    }),
    HttpModule.register({}),
    ONewsModule,
    CategoriesModule,
    RNewsModule,
    DateModule,
    FeedModule,
    HeadlineModule,
    TypeOrmModule.forFeature([ONews]),
  ],
  controllers: [AppController, DeepSeekController, CrawlerController],
  providers: [
    CrawlerService,
    AppService,
    DeepseekService,
  ],
})
export class AppModule {}