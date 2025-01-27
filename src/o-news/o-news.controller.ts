import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ONewsService } from './o-news.service';
import { CreateONewDto } from './dto/create-o-new.dto';
import { UpdateONewDto } from './dto/update-o-new.dto';

@Controller('o-news')
export class ONewsController {
  constructor(private readonly oNewsService: ONewsService) {}

  @Post()
  create(@Body() createONewDto: CreateONewDto) {
    return this.oNewsService.create(createONewDto);
  }

  @Get()
  findAll() {
    return this.oNewsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.oNewsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateONewDto: UpdateONewDto) {
    return this.oNewsService.update(+id, updateONewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.oNewsService.remove(+id);
  }
}
