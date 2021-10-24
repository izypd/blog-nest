import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { IdDto } from '~/common/dto/id.dto';
import { TagService } from './tag.service';
import {
  TagInfoResponse,
  TagInfoVo,
  TagListResponse,
  TagListVo,
} from './tag.vo';
import { TagDto } from './tag.dto';

@ApiTags('标签模块')
@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @ApiOkResponse({ description: '标签列表', type: TagListResponse })
  @Get()
  async getTagList(): Promise<TagListVo> {
    return await this.tagService.getTagList();
  }

  @ApiBearerAuth()
  @ApiCreatedResponse({ description: '创建标签', type: TagInfoResponse })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createTag(@Body() tagDto: TagDto): Promise<TagInfoVo> {
    return await this.tagService.createTag(tagDto);
  }

  @ApiBearerAuth()
  @ApiCreatedResponse({ description: '编辑标签', type: TagInfoResponse })
  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async editTag(
    @Body() tagDto: TagDto,
    @Param() idDto: IdDto,
  ): Promise<TagInfoVo> {
    return await this.tagService.editTag(tagDto, idDto);
  }

  @ApiBearerAuth()
  @ApiCreatedResponse({ description: '删除标签', type: TagInfoResponse })
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteTag(@Param() idDto: IdDto): Promise<TagInfoVo> {
    return await this.tagService.deleteTag(idDto);
  }
}
