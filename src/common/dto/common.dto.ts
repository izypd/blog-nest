import { ApiHideProperty } from '@nestjs/swagger';
import { IdDto } from './id.dto';

export class CommonDto extends IdDto {
  /**
   * 创建时间
   * @example Date
   */
  readonly createTime: Date;

  /**
   * 更新时间
   * @example Date
   */
  readonly updateTime: Date;

  /**
   * 是否删除
   * @example false
   */
  @ApiHideProperty()
  isDelete: boolean;

  /**
   * 更新次数
   * @example 1
   */
  @ApiHideProperty()
  version: number;
}
