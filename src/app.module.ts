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
import { HttpModule, HttpService } from '@nestjs/axios';
import { CrawlerController } from './crawler/crawler.controller';
import { AXIOS_INSTANCE_TOKEN } from '@nestjs/axios/dist/http.constants';
import axios from 'axios';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 20103,
      password: '20020103',
      username: 'postgres',
      entities: [ONews, RNews, Feed, Categories, NDate, Headline], // here we have added user enitity in entities array
      database: 'DatabaseT',
      synchronize: true,
      logging: true,
    }),
    HttpModule,
    ONewsModule,
    CategoriesModule,
    RNewsModule,
    DateModule,
    FeedModule,
    HeadlineModule,
  ],
  controllers: [AppController, DeepSeekController, CrawlerController],
  providers: [
    CrawlerService,
    {
      provide: AXIOS_INSTANCE_TOKEN,
      useValue: axios.create(), // 手动提供 axios 实例
    },
    AppService,
    DeepseekService,
    CrawlerService,
    HttpService
  ],
  
})
export class AppModule {}