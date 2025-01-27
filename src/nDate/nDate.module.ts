import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DateService } from './nDate.service';
import { DateController } from './nDate.controller';
import { NDate } from './entities/nDate.entity';
import { ONews } from 'src/o-news/entities/o-new.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NDate, ONews])],
  controllers: [DateController],
  providers: [DateService],
})
export class DateModule {}
