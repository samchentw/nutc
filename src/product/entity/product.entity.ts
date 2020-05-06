
import { Entity, Column, OneToMany, BeforeInsert, JoinColumn, JoinTable, ManyToOne, ManyToMany } from 'typeorm';
import { BaseEntity } from '@app/core/shared';
import { Expose } from 'class-transformer';
import { ProductTypeEntity } from './productType.entity';
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
  description: string;

  @Column()
  @Expose()
  isDelete: boolean;

  @Column()
  @Expose()
  ProductImage: string;

  @ManyToMany(type => ProductTypeEntity, { eager: true })
  @JoinTable()
  productTypes: ProductTypeEntity[];

}