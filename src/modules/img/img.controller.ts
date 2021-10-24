import {
  Controller,
  Get,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PageDto } from '~/common/dto/page.dto';
import { ImgService } from './img.service';
import {
  ImgInfoSuccessVo,
  ImgInfoVo,
  ImgListSuccessVo,
  ImgListVo,
} from './img.dto';

@ApiTags('图床模块')
@Controller('img')
export class ImgController {
  constructor(private readonly imgService: ImgService) {}

  @ApiOkResponse({ description: '图片列表', type: ImgListSuccessVo })
  @Get()
  async getImgList(@Query() pageDto: PageDto): Promise<ImgListVo> {
    return await this.imgService.getImgList(pageDto);
  }

  @ApiOkResponse({ description: '上传图片', type: ImgInfoSuccessVo })
  @Put()
  @UseInterceptors(FileInterceptor('file'))
  async uploadImg(@UploadedFile() file: any): Promise<ImgInfoVo> {
    return await this.imgService.uploadImg(file);
  }
}
