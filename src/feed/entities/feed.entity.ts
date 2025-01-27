import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { ONews } from 'src/o-news/entities/o-new.entity';

@Entity()
export class Feed {
  @PrimaryColumn('uuid')
  feed_id: string;

  @Column()
  f_link: string;

  @OneToMany(() => ONews, oNews => oNews.feed)
  oNews: ONews[];
}