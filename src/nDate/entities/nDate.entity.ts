import { Entity, Column, PrimaryColumn, OneToMany, CreateDateColumn } from 'typeorm';
import { ONews } from 'src/o-news/entities/o-new.entity';

@Entity()
export class NDate {
  @PrimaryColumn('uuid')
  date_id: string;

  @CreateDateColumn()
  created_on: Date

  @OneToMany(() => ONews, oNews => oNews.nDate)
  oNews: ONews[];
}