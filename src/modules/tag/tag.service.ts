import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IdDto } from '~/common/dto/id.dto';
import { Repository } from 'typeorm';
import { TagDto } from './tag.dto';
import { Tag } from './tag.entity';
import { TagInfoVo, TagListVo } from './tag.vo';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async getTagList(): Promise<TagListVo> {
    const list = await this.tagRepository
      .createQueryBuilder('tag')
      .where({ isDelete: false })
      .select(['tag.id', 'tag.label'])
      .getMany();
    return {
      list: list,
    };
  }

  async createTag(tagDto: TagDto): Promise<TagInfoVo> {
    const { label } = tagDto;
    const hasTag = await this.tagRepository.findOne({ label });
    if (hasTag) {
      throw new BadRequestException(`${label}标签已存在`);
    }
    const tag = new Tag();
    tag.label = tagDto.label;
    const result = await this.tagRepository.save(tag);
    return {
      info: result,
    };
  }

  async editTag(tagDto: TagDto, idDto: IdDto): Promise<TagInfoVo> {
    const { id } = idDto;
    const { label } = tagDto;

    const tag = await this.tagRepository.findOne({ id });
    tag.label = label;
    const result = await this.tagRepository.save(tag);
    return {
      info: result,
    };
  }

  async deleteTag(idDto: IdDto) {
    const { id } = idDto;
    const tag = await this.tagRepository.findOne({ id });
    tag.isDelete = true;
    const result = await this.tagRepository.save(tag);
    return {
      info: result,
    };
  }
}
