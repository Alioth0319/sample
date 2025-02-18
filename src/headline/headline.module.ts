import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeadlineService } from './headline.service';
import { HeadlineController } from './headline.controller';
import { Headline } from '../database/entities/headline.entity';
import { ONews } from 'src/database/entities/o-new.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Headline, ONews])],
  controllers: [HeadlineController],
  providers: [HeadlineService],
})
export class HeadlineModule {}
