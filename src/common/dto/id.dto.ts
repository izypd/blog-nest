import { IsNotEmpty, Matches } from 'class-validator';
import { regPositive } from '~/common/constant/regex.constant';

export class IdDto {
  /**
   * 主键 id
   * @example 1
   */
  @IsNotEmpty({ message: 'id 不能为空' })
  @Matches(regPositive, { message: '请输入有效 id' })
  readonly id: number;
}
