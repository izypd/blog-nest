import { OmitType } from '@nestjs/swagger';
import { PaginationDto } from './pagination.dto';

export class PageDto extends OmitType(PaginationDto, [
  'pages',
  'total',
] as const) {}
