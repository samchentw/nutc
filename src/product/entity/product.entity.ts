
import { Entity, Column, OneToMany, BeforeInsert, JoinColumn, JoinTable, ManyToOne } from 'typeorm';
import { BaseEntity } from '@app/core/shared';
import { Expose } from 'class-transformer';
@Entity()
export class ProductEntity extends BaseEntity {

  @Column({ length: 30, unique: true })
  @Expose()
  name: string;

  @Column()
  @Expose()
  price: number;

  @Column()
  @Expose()
  type: string;

  @Column()
  @Expose()
  description: string;

  @Column()
  @Expose()
  isDelete: boolean;

  @Column()
  @Expose()
  ProductImage: string;

}