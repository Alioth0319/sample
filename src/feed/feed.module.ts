import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedService } from './feed.service';
import { FeedController } from './feed.controller';
import { Feed } from './entities/feed.entity';
import { ONews } from 'src/o-news/entities/o-new.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Feed, ONews])],
  controllers: [FeedController],
  providers: [FeedService],
})
export class FeedModule {}
