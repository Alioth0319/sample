import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WriterService } from './writer.service';
import { WriterController } from './writer.controller';
import { Writer } from 'src/writer/entities/writer.entity';
import { ONews } from 'src/o-news/entities/o-new.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Writer, ONews])],
  controllers: [WriterController],
  providers: [WriterService],
})
export class WriterModule {}
