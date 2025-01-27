import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RNewsService } from './r-news.service';
import { CreateRNewDto } from './dto/create-r-new.dto';
import { UpdateRNewDto } from './dto/update-r-new.dto';

@Controller('r-news')
export class RNewsController {
  constructor(private readonly rNewsService: RNewsService) {}

  @Post()
  create(@Body() createRNewDto: CreateRNewDto) {
    return this.rNewsService.create(createRNewDto);
  }

  @Get()
  findAll() {
    return this.rNewsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rNewsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRNewDto: UpdateRNewDto) {
    return this.rNewsService.update(+id, updateRNewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rNewsService.remove(+id);
  }
}
