import { IsNotEmpty } from 'class-validator';
import { IdDto } from '~/common/dto/id.dto';
import { PageDto } from '~/common/dto/page.dto';

export class NoteListDto extends PageDto {
  /**
   * tagId
   * @example 1
   */
  tagId?: number;
}

export class NoteDto {
  /**
   * 笔记标题
   * @example 青花瓷
   */
  @IsNotEmpty({ message: '请输入笔记标题' })
  readonly title?: string;

  /**
   * 笔记标题图片url
   * @example https://y.qq.com/music/photo_new/T002R300x300M000002eFUFm2XYZ7z_1.jpg
   */
  @IsNotEmpty({ message: '请输入笔记标题图片url' })
  readonly imgUrl?: string;

  /**
   * 笔记内容
   * @example 天青色等烟雨，而我在等你。
   */
  @IsNotEmpty({ message: '请输入笔记内容' })
  readonly content?: string;

  /**
   * 标签 格式 [{id: 1}, {id: 2}]
   * @example () => [Tag]
   */
  readonly tags?: IdDto[];
}
