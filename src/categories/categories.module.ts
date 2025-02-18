import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { Categories } from '../database/entities/category.entity';
import { ONews } from 'src/database/entities/o-new.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Categories, ONews])],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
