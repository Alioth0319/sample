import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ONewsService } from './o-news.service';
import { ONewsController } from './o-news.controller';
import { ONews } from './entities/o-new.entity';
import { Writer } from 'src/writer/entities/writer.entity';
import { RNews } from 'src/r-news/entities/r-new.entity';
import { Categories } from 'src/categories/entities/category.entity';
import { Headline } from 'src/headline/entities/headline.entity';
import { NDate } from 'src/nDate/entities/nDate.entity';
import { Feed } from 'src/feed/entities/feed.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ONews, Writer,RNews, Categories, Headline, NDate, Feed])],
  controllers: [ONewsController],
  providers: [ONewsService],
})
export class ONewsModule {}
