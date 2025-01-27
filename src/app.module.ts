import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
//import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ONewsModule } from './o-news/o-news.module';
import { CategoriesModule } from './categories/categories.module';
import { RNewsModule } from './r-news/r-news.module';
import { DateModule } from './nDate/nDate.module';
import { WriterModule } from './writer/writer.module';
import { FeedModule } from './feed/feed.module';
import { HeadlineModule } from './headline/headline.module';
import { ONews } from './o-news/entities/o-new.entity';
import { RNews } from './r-news/entities/r-new.entity';
import { Writer } from './writer/entities/writer.entity';
import { Feed } from './feed/entities/feed.entity';
import { Categories } from './categories/entities/category.entity';
import { Headline } from './headline/entities/headline.entity';
import { NDate } from './nDate/entities/nDate.entity';
import { DeepseekService } from './deepseek/deepseek.service';
import { DeepSeekController } from 'src/deepseek/deepseek.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 20103,
      password: '20020103',
      username: 'postgres',
      entities: [ONews, RNews, Writer, Feed, Categories, NDate, Headline], // here we have added user enitity in entities array
      database: 'DatabaseT',
      synchronize: true,
      logging: true,
    }),
    ONewsModule,
    CategoriesModule,
    RNewsModule,
    DateModule,
    WriterModule,
    FeedModule,
    HeadlineModule,
  ],
  controllers: [DeepSeekController],
  providers: [AppService, DeepseekService],
})
export class AppModule {}