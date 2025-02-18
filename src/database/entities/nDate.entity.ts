import { Entity, PrimaryColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ONews } from 'src/database/entities/o-new.entity';

@Entity()
export class NDate {
  @PrimaryColumn('uuid')
  date_id: string;

  @CreateDateColumn()
  created_on: Date

  @UpdateDateColumn()
  updated_on_r: Date

  @OneToMany(() => ONews, oNews => oNews.nDate)
  oNews: ONews[];
}