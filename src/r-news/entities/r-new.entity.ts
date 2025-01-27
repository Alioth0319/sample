import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ONews } from 'src/o-news/entities/o-new.entity';

@Entity()
export class RNews {
  @PrimaryColumn('uuid')
  rNews_id: string;

  @Column('text')
  text_r: string;

  @CreateDateColumn()
  created_on_r: Date

  @UpdateDateColumn()
  updated_on_r: Date

  @OneToMany(() => ONews, oNews => oNews.rNews)
  oNews: ONews[];
}