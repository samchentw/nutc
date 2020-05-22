
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { BaseEntity } from '@app/core/shared';

@Entity()
export class Setting {

  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp' })
  createTime: Date;


  @Column({ length: 30, unique: true })
  key: string;

  @Column()
  value: string;

  @Column()
  description: string;

  @Column()
  enable: boolean;
}