import { PartialType } from '@nestjs/mapped-types';
import { CreateDateDto } from './create-nDate.dto';

export class UpdateDateDto extends PartialType(CreateDateDto) {}
