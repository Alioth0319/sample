import { Injectable } from '@nestjs/common';
import { CreateRNewDto } from './dto/create-r-new.dto';
import { UpdateRNewDto } from './dto/update-r-new.dto';

@Injectable()
export class RNewsService {
  create(createRNewDto: CreateRNewDto) {
    return 'This action adds a new rNew';
  }

  findAll() {
    return `This action returns all rNews`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rNew`;
  }

  update(id: number, updateRNewDto: UpdateRNewDto) {
    return `This action updates a #${id} rNew`;
  }

  remove(id: number) {
    return `This action removes a #${id} rNew`;
  }
}
