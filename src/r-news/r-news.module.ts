import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RNewsService } from './r-news.service';
import { RNewsController } from './r-news.controller';
import { RNews } from './entities/r-new.entity';
import { ONews } from 'src/o-news/entities/o-new.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RNews, ONews])],
  controllers: [RNewsController],
  providers: [RNewsService],
  exports: [TypeOrmModule],
})
export class RNewsModule {}
