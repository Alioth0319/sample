import { Entity, Column, PrimaryColumn, OneToOne, ManyToOne, CreateDateColumn, DeleteDateColumn, JoinColumn, OneToMany } from 'typeorm';
import { Categories } from 'src/database/entities/category.entity';
import { NDate } from 'src/database/entities/nDate.entity'; 
import { Feed } from 'src/database/entities/feed.entity';
import { Headline } from 'src/database/entities/headline.entity';
import { RNews } from 'src/database/entities/r-new.entity';

@Entity()
export class ONews {
  @PrimaryColumn('uuid')
  oNews_id: string;

  @Column()
  url: string;

  @Column('text')
  text: string;

  @CreateDateColumn()
  created_on: Date

  /* previous relationship if any */

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
