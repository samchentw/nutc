
import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '@app/core/shared';
import { ProductEntity } from './product.entity';
@Entity()
export class ShopEntity extends BaseEntity {

  @Column({ length: 30, unique: true })
  name: string;

  @Column()
  phone: string;

  @Column()
  address: string;

  @Column()
  description: string;

  @Column()
  remark: string;

  @Column()
  delete: boolean;

  @OneToMany(type => ProductEntity, productEntity => productEntity.shop)
  Product: ProductEntity[];

}