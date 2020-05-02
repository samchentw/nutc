
import { Entity, Column, OneToMany, BeforeInsert, JoinColumn, JoinTable, ManyToOne } from 'typeorm';
import { BaseEntity } from '@app/core/shared';
import { Expose } from 'class-transformer';
@Entity()
export class OrderEntity extends BaseEntity {

  @Column({ length: 30, unique: true })
  @Expose()
  name: string;

}