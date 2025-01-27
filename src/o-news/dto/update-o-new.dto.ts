import { PartialType } from '@nestjs/mapped-types';
import { CreateONewDto } from './create-o-new.dto';

export class UpdateONewDto extends PartialType(CreateONewDto) {}
