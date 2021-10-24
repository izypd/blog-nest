import { Entity, Column } from 'typeorm';
import { Common } from '~/common/entity';

@Entity()
export class User extends Common {
  // 用户名
  @Column('text')
  username: string;

  // 加密后的密码
  @Column({
    type: 'text',
    select: false,
  })
  password: string;

  // 加密盐
  @Column({
    type: 'text',
    select: false,
  })
  salt: string;
}
