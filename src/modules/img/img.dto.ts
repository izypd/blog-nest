import { IsNotEmpty } from 'class-validator';
import { SuccessVo } from '~/common/dto/success.dto';
import { PaginationDto } from '~/common/dto/pagination.dto';

export class ImgDto {
  /**
   * 图片路径
   * @example /upload/static/1.png
   */
  @IsNotEmpty({ message: '请输入图片路径' })
  readonly src: string;
}

export class CreateImgDto extends ImgDto {
  /**
   * 图片md5
   * @example asdfghjkl
   */
  readonly sign?: string;
}

export class ImgInfo extends ImgDto {}

export class ImgInfoVo {
  info: ImgInfo;
}

export class ImgInfoSuccessVo extends SuccessVo {
  data: {
    info: ImgInfo;
  };
}

export class ImgListItem extends ImgDto {}

export class ImgListVo {
  list: ImgListItem[];
  pagination: PaginationDto;
}

export class ImgListSuccessVo extends SuccessVo {
  data: {
    list: ImgListItem[];
    pagination: PaginationDto;
  };
}
