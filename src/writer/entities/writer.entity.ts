import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { ONews } from 'src/o-news/entities/o-new.entity';

@Entity()
export class Writer {
  @PrimaryColumn('uuid')
  writer_id: string;

  @Column()
  name: string;

  @OneToMany(() => ONews, oNews => oNews.writer)
  oNews: ONews[];
}