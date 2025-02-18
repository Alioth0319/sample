import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ONewsService } from './o-news.service';
import { ONewsController } from './o-news.controller';
import { ONews } from '../database/entities/o-new.entity';
import { RNews } from 'src/database/entities/r-new.entity';
import { Categories } from 'src/database/entities/category.entity';
import { Headline } from 'src/database/entities/headline.entity';
import { NDate } from 'src/database/entities/nDate.entity';
import { Feed } from 'src/database/entities/feed.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ONews, RNews, Categories, Headline, NDate, Feed])],
  controllers: [ONewsController],
  providers: [ONewsService],
})
export class ONewsModule {}
