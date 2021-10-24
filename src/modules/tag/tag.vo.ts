import { IsNotEmpty } from 'class-validator';

export class TagDto {
  /**
   * 标签名称
   * @example 标签1
   */
  @IsNotEmpty()
  label: string;
}

export class TagListVo {
  list: TagDto[];
}

export class TagListResponse {
  data: TagListVo;
}

export class TagInfoVo {
  info: TagDto;
}

export class TagInfoResponse {
  data: {
    info: TagDto;
  };
}
