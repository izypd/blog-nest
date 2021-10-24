import { IsOptional, Matches } from 'class-validator';
import { regPositiveOrEmpty } from '~/common/constant/regex.constant';

export class PaginationDto {
  /**
   * 第几页
   * @example 1
   */
  @IsOptional()
  @Matches(regPositiveOrEmpty, { message: '页数应为正整数或空' })
  readonly page?: number;

  /**
   * 每页数据条数
   * @example 10
   */
  @IsOptional()
  @Matches(regPositiveOrEmpty, { message: '每页项目数应为正整数或空' })
  readonly pageSize?: number;

  /**
   * 总页数
   * @example 10
   */
  pages: number;

  /**
   * 总条数
   * @example 100
   */
  total: number;
}
