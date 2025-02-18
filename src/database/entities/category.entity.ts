import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { ONews } from 'src/database/entities/o-new.entity';

@Entity()
export class Categories {
  @PrimaryColumn('uuid')
  categories_id: string;

  @Column()
  c_name: string;

  @OneToMany(() => ONews, oNews => oNews.categories)
  oNews: ONews[];
}