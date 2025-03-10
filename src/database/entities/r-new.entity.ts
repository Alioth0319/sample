import { Entity, Column, CreateDateColumn, UpdateDateColumn, OneToMany, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';
import { ONews } from 'src/database/entities/o-new.entity';

@Entity()
export class RNews {
  @PrimaryColumn('uuid')
  rNews_id: string;

  @Column('text')
  text_r: string;

  @CreateDateColumn()
  created_on_r: Date

  @OneToMany(() => ONews, oNews => oNews.rNews)
  oNews: ONews[];
  updated_on_r: Date;
}