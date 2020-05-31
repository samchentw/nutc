
import { Entity, Column, BaseEntity, BeforeInsert, JoinColumn, JoinTable, ManyToOne, ManyToMany, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { Expose } from 'class-transformer';
@Entity()
export class Contact extends BaseEntity {

  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  @CreateDateColumn({ type: 'timestamp' })
  @Expose()
  createTime: Date;

  @Column({ length: 30 })
  @Expose()
  name: string;

  @Column()
  @Expose()
  phone: string;

  @Column()
  @Expose()
  mail: string;


  @Column()
  @Expose()
  message: string;

}