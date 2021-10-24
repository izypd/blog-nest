import { ApiProperty } from '@nestjs/swagger';

export class FeedbackInfoVo {
  @ApiProperty({ description: '操作的执行情况', example: '成功创建笔记' })
  info: string;
}

export class FeedbackInfoResponse {
  @ApiProperty({ description: '状态码', example: 200 })
  code: number;

  @ApiProperty({
    description: '数据',
    type: () => FeedbackInfoVo,
    example: FeedbackInfoVo,
  })
  data: FeedbackInfoVo;

  @ApiProperty({ description: '请求结果信息', example: '请求成功' })
  message: string;
}
