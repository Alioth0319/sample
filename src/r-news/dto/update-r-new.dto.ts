import { PartialType } from '@nestjs/mapped-types';
import { CreateRNewDto } from './create-r-new.dto';

export class UpdateRNewDto extends PartialType(CreateRNewDto) {}
