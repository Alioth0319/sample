import { Injectable } from '@nestjs/common';
import { CreateHeadlineDto } from './dto/create-headline.dto';
import { UpdateHeadlineDto } from './dto/update-headline.dto';

@Injectable()
export class HeadlineService {
  create(createHeadlineDto: CreateHeadlineDto) {
    return 'This action adds a new headline';
  }

  findAll() {
    return `This action returns all headline`;
  }

  findOne(id: number) {
    return `This action returns a #${id} headline`;
  }

  update(id: number, updateHeadlineDto: UpdateHeadlineDto) {
    return `This action updates a #${id} headline`;
  }

  remove(id: number) {
    return `This action removes a #${id} headline`;
  }
}
