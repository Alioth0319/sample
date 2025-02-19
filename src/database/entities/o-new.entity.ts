import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, CreateDateColumn, DeleteDateColumn } from 'typeorm';
import { Categories } from 'src/database/entities/category.entity';
import { NDate } from 'src/database/entities/nDate.entity'; 
import { Feed } from 'src/database/entities/feed.entity';
import { Headline } from 'src/database/entities/headline.entity';
import { RNews } from 'src/database/entities/r-new.entity';

@Entity()
export class ONews {
  @PrimaryGeneratedColumn('uuid') // 自动生成 UUID
  oNews_id: string;

  @Column()
  url: string;

  @Column()
  title: string;

  @Column('text')
  text: string;

  @CreateDateColumn()
  created_on: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_on: Date;

  @ManyToOne(() => Categories, (categories) => categories.oNews)
  @JoinColumn({ name: 'oNews_categories' })
  categories: Categories;

  @ManyToOne(() => NDate, (nDate) => nDate.oNews)
  @JoinColumn({ name: 'oNews_date' })
  nDate: NDate;

  @ManyToOne(() => Feed, (feed) => feed.oNews)
  @JoinColumn({ name: 'oNews_link' })
  feed: Feed;

  @OneToOne(() => Headline, (headline) => headline.oNews)
  @JoinColumn({ name: 'oNews_headline' })
  headline: Headline;

  @ManyToOne(() => RNews, (rNew) => rNew.oNews)
  @JoinColumn({ name: 'oNews_rNews' })
  rNews: RNews;
}