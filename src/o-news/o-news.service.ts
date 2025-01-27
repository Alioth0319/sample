import { Injectable } from '@nestjs/common';
import { CreateONewDto } from './dto/create-o-new.dto';
import { UpdateONewDto } from './dto/update-o-new.dto';

@Injectable()
export class ONewsService {
  create(createONewDto: CreateONewDto) {
    return 'This action adds a new oNew';
  }

  findAll() {
    return `This action returns all oNews`;
  }

  findOne(id: number) {
    return `This action returns a #${id} oNew`;
  }

  update(id: number, updateONewDto: UpdateONewDto) {
    return `This action updates a #${id} oNew`;
  }

  remove(id: number) {
    return `This action removes a #${id} oNew`;
  }
}
