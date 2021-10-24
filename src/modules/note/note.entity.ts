import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { Common } from '~/common/entity';
import { Tag } from '~/modules/tag/tag.entity';

@Entity()
export class Note extends Common {
  // 笔记标题，不超过255B
  @Column('tinytext')
  title: string;

  // 笔记标题图片url，不超过255B
  @Column('tinytext')
  imgUrl: string;

  // 笔记内容Markdown，Deflate压缩后，不超过64KB
  @Column('text')
  content: string;

  // 标签
  @ManyToMany(() => Tag, (tag) => tag.notes)
  @JoinTable()
  tags: Tag[];
}
