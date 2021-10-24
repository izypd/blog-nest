import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { IdDto } from '~/common/dto/id.dto';
import { NoteDto, NoteListDto } from './note.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './note.entity';
import { getPagination } from '~/common/util/pagination.util';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,
  ) {}

  async getNoteList(noteListDto: NoteListDto) {
    const page = Number(noteListDto?.page) || 1;
    const pageSize = Number(noteListDto?.pageSize) || 4;
    const listAndTotal = await this.noteRepository
      .createQueryBuilder('note')
      .where({ isDelete: false })
      .orderBy('note.updateTime', 'DESC')
      .leftJoin('note.tags', 'tag')
      .select([
        'note.id',
        'note.title',
        'note.imgUrl',
        'note.createTime',
        'note.updateTime',
      ])
      .addSelect(['tag.id', 'tag.label'])
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();

    const [list, total] = listAndTotal;
    const pagination = getPagination(total, pageSize, page);

    return {
      list,
      pagination,
    };
  }

  async getNoteListByTagId(noteListDto: NoteListDto) {
    const page = Number(noteListDto?.page) || 1;
    const pageSize = Number(noteListDto?.pageSize) || 4;
    const { tagId } = noteListDto;
    const listAndTotal = await this.noteRepository
      .createQueryBuilder('note')
      .where({ isDelete: false })
      .orderBy('note.updateTime', 'DESC')
      .andWhere('tag.id = :id', { id: tagId })
      .andWhere('tag.isDelete = :isDelete', { isDelete: false })
      .leftJoin('note.tags', 'tag')
      .select([
        'note.id',
        'note.title',
        'note.imgUrl',
        'note.createTime',
        'note.updateTime',
      ])
      .addSelect(['tag.id', 'tag.label'])
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();

    const [list, total] = listAndTotal;
    const pagination = getPagination(total, pageSize, page);

    return {
      list,
      pagination,
    };
  }

  async getNote(idDto: IdDto) {
    const { id } = idDto;
    const note = await this.noteRepository
      .createQueryBuilder('note')
      .where('note.id = :id', { id })
      .leftJoin('note.tags', 'tag')
      .select([
        'note.id',
        'note.title',
        'note.imgUrl',
        'note.content',
        'note.createTime',
        'note.updateTime',
      ])
      .addSelect(['tag.id', 'tag.label'])
      .getOne();

    if (!note || note.isDelete) {
      throw new NotFoundException('文章不存在');
    }

    return {
      info: note,
    };
  }

  async createNote(noteDto: NoteDto) {
    const note = new Note();
    for (const key in noteDto) {
      note[key] = noteDto[key];
    }
    // TODO 添加保存失败异常处理
    await this.noteRepository.save(note);
    return {
      info: '成功创建笔记',
    };
  }

  async editNote(noteDto: NoteDto, idDto: IdDto) {
    if (!(noteDto.title || noteDto.imgUrl || noteDto.content || noteDto.tags)) {
      throw new BadRequestException('你还没有修改笔记，不需要提交编辑');
    }
    const { id } = idDto;
    const note = await this.noteRepository.findOne({ id });
    for (const key in noteDto) {
      if (key !== 'id') {
        note[key] = noteDto[key];
      }
    }
    // TODO 添加保存失败异常处理
    await this.noteRepository.save(note);
    return {
      info: '成功编辑笔记',
    };
  }

  async deleteNote(idDto: IdDto) {
    const { id } = idDto;
    const note = await this.noteRepository.findOne({ id });
    if (note.isDelete) {
      throw new BadRequestException('笔记之前已被删除');
    }
    note.isDelete = true;
    // TODO 添加保存失败异常处理
    await this.noteRepository.save(note);
    return {
      info: '成功删除笔记',
    };
  }
}
