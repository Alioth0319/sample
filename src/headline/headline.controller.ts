import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HeadlineService } from './headline.service';
import { CreateHeadlineDto } from './dto/create-headline.dto';
import { UpdateHeadlineDto } from './dto/update-headline.dto';

@Controller('headline')
export class HeadlineController {
  constructor(private readonly headlineService: HeadlineService) {}

  @Post()
  create(@Body() createHeadlineDto: CreateHeadlineDto) {
    return this.headlineService.create(createHeadlineDto);
  }

  @Get()
  findAll() {
    return this.headlineService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.headlineService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHeadlineDto: UpdateHeadlineDto) {
    return this.headlineService.update(+id, updateHeadlineDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.headlineService.remove(+id);
  }
}
