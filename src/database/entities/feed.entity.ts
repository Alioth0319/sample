import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { ONews } from 'src/database/entities/o-new.entity';

@Entity()
export class Feed {
  @PrimaryColumn('uuid')
  feed_id: string;

  @Column()
  f_url: string;

  @OneToMany(() => ONews, oNews => oNews.feed)
  oNews: ONews[];
}