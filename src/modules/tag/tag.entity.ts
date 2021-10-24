import { IsNotEmpty } from 'class-validator';
import { Common } from '~/common/entity';
import { Column, Entity, ManyToMany } from 'typeorm';
import { Note } from '~/modules/note/note.entity';

@Entity()
export class Tag extends Common {
  @Column()
  @IsNotEmpty()
  label: string;

  // 笔记
  @ManyToMany(() => Note, (note) => note.tags)
  notes: Note[];
}
