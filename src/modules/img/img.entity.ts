import { Common } from '~/common/entity';
import { Entity, Column } from 'typeorm';

@Entity()
export class Img extends Common {
  // 图片路径
  @Column('text')
  src: string;

  // 文件签名
  @Column('text')
  sign: string;
}
