import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DateService } from './nDate.service';
import { DateController } from './nDate.controller';
import { NDate } from '../database/entities/nDate.entity';
import { ONews } from 'src/database/entities/o-new.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NDate, ONews])],
  controllers: [DateController],
  providers: [DateService],
})
export class DateModule {}
