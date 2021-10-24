import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { NoteService } from './note.service';
import { IdDto } from '~/common/dto/id.dto';
import { NoteDto, NoteListDto } from './note.dto';
import { ApiTags, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import {
  NoteListVo,
  NoteListResponse,
  NoteInfoVo,
  NoteInfoResponse,
} from './note.vo';
import { FeedbackInfoVo, FeedbackInfoResponse } from '~/common/vo';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('笔记模块')
@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Get()
  @ApiOkResponse({ description: '笔记列表', type: NoteListResponse })
  async getNoteList(@Query() noteListDto: NoteListDto): Promise<NoteListVo> {
    const { tagId } = noteListDto;
    if (tagId) {
      return await this.noteService.getNoteListByTagId(noteListDto);
    }
    return await this.noteService.getNoteList(noteListDto);
  }

  @Get(':id')
  @ApiOkResponse({ description: '笔记详情', type: NoteInfoResponse })
  async getNote(@Param() idDto: IdDto): Promise<NoteInfoVo> {
    return await this.noteService.getNote(idDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiBearerAuth()
  @ApiOkResponse({ description: '创建笔记', type: FeedbackInfoResponse })
  async createNote(@Body() noteDto: NoteDto): Promise<FeedbackInfoVo> {
    return await this.noteService.createNote(noteDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ description: '编辑笔记', type: FeedbackInfoResponse })
  async editNote(
    @Body() noteDto: NoteDto,
    @Param() idDto: IdDto,
  ): Promise<FeedbackInfoVo> {
    return await this.noteService.editNote(noteDto, idDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ description: '删除笔记', type: FeedbackInfoResponse })
  async deleteNote(@Param() idDto: IdDto): Promise<FeedbackInfoVo> {
    return await this.noteService.deleteNote(idDto);
  }
}
