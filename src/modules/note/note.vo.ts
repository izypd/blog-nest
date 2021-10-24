import { ApiProperty } from '@nestjs/swagger';

class NoteListItem {
  @ApiProperty({ description: '笔记id', example: 1 })
  id: number;

  @ApiProperty({ description: '创建时间', example: '2021-01-01' })
  createTime: Date;

  @ApiProperty({ description: '更新时间', example: '2021-01-01' })
  updateTime: Date;

  @ApiProperty({ description: '笔记标题', example: '青花瓷' })
  title: string;

  @ApiProperty({
    description: '笔记标题图片url',
    example:
      'https://y.qq.com/music/photo_new/T002R300x300M000002eFUFm2XYZ7z_1.jpg',
  })
  imgUrl: string;
}

class NoteInfo extends NoteListItem {
  @ApiProperty({
    description: '笔记内容',
    example: '天青色等烟雨，而我在等你。',
  })
  content: string;
}

class Pagination {
  @ApiProperty({ description: '页数', example: 1 })
  page: number;

  @ApiProperty({ description: '每页笔记数', example: 10 })
  pageSize: number;

  @ApiProperty({ description: '总页数', example: 10 })
  pages: number;

  @ApiProperty({ description: '总笔记数', example: 100 })
  total: number;
}

export class NoteListVo {
  @ApiProperty({ type: NoteListItem, isArray: true })
  list: Array<NoteListItem>;

  @ApiProperty({ type: () => Pagination })
  pagination: Pagination;
}

export class NoteListResponse {
  @ApiProperty({ description: '状态码', example: 200 })
  code: number;

  @ApiProperty({
    description: '数据',
    type: () => NoteListVo,
    example: NoteListVo,
  })
  data: NoteListVo;

  @ApiProperty({ description: '请求结果信息', example: '请求成功' })
  message: string;
}

export class NoteInfoVo {
  @ApiProperty({ type: NoteInfo })
  info: NoteInfo;
}

export class NoteInfoResponse {
  @ApiProperty({ description: '状态码', example: 200 })
  code: number;

  @ApiProperty({
    description: '数据',
    type: () => NoteInfoVo,
    example: NoteInfoVo,
  })
  data: NoteInfoVo;

  @ApiProperty({ description: '请求结果信息', example: '请求成功' })
  message: string;
}
