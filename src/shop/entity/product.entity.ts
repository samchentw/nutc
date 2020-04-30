import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from '@app/core/shared';
import { ShopEntity } from './shop.entity';
@Entity()
export class ProductEntity extends BaseEntity{  

  @Column()
  name: string;

  @ManyToOne(type => ShopEntity, shopEntity => shopEntity.Product)
  shop: ShopEntity;

}