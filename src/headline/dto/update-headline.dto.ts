import { PartialType } from '@nestjs/mapped-types';
import { CreateHeadlineDto } from './create-headline.dto';

export class UpdateHeadlineDto extends PartialType(CreateHeadlineDto) {}
