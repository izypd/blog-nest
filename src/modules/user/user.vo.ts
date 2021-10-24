import { ApiProperty } from '@nestjs/swagger';

class UserInfo {
  @ApiProperty({ description: '用户id', example: 1 })
  id: number;

  @ApiProperty({ description: '创建时间', example: '2021-01-01' })
  createTime: Date;

  @ApiProperty({ description: '更新时间', example: '2021-01-01' })
  updateTime: Date;

  @ApiProperty({ description: '用户名', example: 'username' })
  username: string;
}

export class UserInfoVo {
  @ApiProperty({ type: UserInfo })
  info: UserInfo;
}

export class UserInfoResponse {
  @ApiProperty({ description: '状态码', example: 200 })
  code: number;

  @ApiProperty({
    description: '数据',
    type: () => UserInfoVo,
    example: UserInfoVo,
  })
  data: UserInfoVo;

  @ApiProperty({ description: '请求结果信息', example: '请求成功' })
  message: string;
}

export class Token {
  @ApiProperty({ description: 'token', example: 'dfayklxhfupptpvhvz' })
  token: string;
}

export class TokenVo {
  @ApiProperty({ type: Token })
  info: Token;
}

export class TokenResponse {
  @ApiProperty({ description: '状态码', example: 200 })
  code: number;

  @ApiProperty({ description: '数据', type: () => TokenVo, example: TokenVo })
  data: TokenVo;

  @ApiProperty({ description: '请求结果信息', example: '请求成功' })
  message: string;
}
