import { Entity, Column, PrimaryColumn, OneToOne } from 'typeorm';
import { ONews } from 'src/o-news/entities/o-new.entity';

@Entity()
export class Headline {
  @PrimaryColumn('uuid')
  headline_id: string;

  @Column()
  headline_name: string;

  @OneToOne(() => ONews, oNews => oNews.headline)
  oNews: ONews;
}