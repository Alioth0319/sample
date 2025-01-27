import { Entity, Column, PrimaryColumn, OneToOne, ManyToOne, CreateDateColumn, DeleteDateColumn, JoinColumn, OneToMany } from 'typeorm';
import { Writer } from 'src/writer/entities/writer.entity';
import { Categories } from 'src/categories/entities/category.entity';
import { NDate } from 'src/nDate/entities/nDate.entity'; 
import { Feed } from 'src/feed/entities/feed.entity';
import { Headline } from 'src/headline/entities/headline.entity';
import { RNews } from 'src/r-news/entities/r-new.entity';

@Entity()
export class ONews {
  @PrimaryColumn('uuid')
  oNews_id: string;

  @Column('text')
  text: string;

  @CreateDateColumn()
  created_on: Date

  @DeleteDateColumn({ nullable: true })
  deleted_on: Date;

  /* previous relationship if any */

  @ManyToOne(() => Writer, (writer) => writer.oNews)
  @JoinColumn({ name: 'oNews_writer' })
  writer: Writer

  @ManyToOne(() => Categories, (categories) => categories.oNews)
  @JoinColumn({ name: 'oNews_categories' })
  categories: Categories

  @ManyToOne(() => NDate, (nDate) => nDate.oNews)
  @JoinColumn({ name: 'oNews_date' })
  nDate: NDate

  @ManyToOne(() => Feed, (feed) => feed.oNews)
  @JoinColumn({ name: 'oNews_link' })
  feed: Feed

  @OneToOne(() => Headline, (headline) => headline.oNews)
  @JoinColumn({ name: 'oNews_headline' })
  headline: Headline

  @ManyToOne(() => RNews, (rNew) => rNew.oNews)
  @JoinColumn({ name: 'oNews_rNews' })
  rNews: RNews;
}
