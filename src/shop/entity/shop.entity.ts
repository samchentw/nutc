
import { Entity, Column, OneToMany, BeforeInsert, JoinColumn, JoinTable, ManyToOne } from 'typeorm';
import { BaseEntity } from '@app/core/shared';
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
  isDelete: boolean;

  // @OneToMany(type => ProductEntity, productEntity => productEntity.shop)
  // Product: ProductEntity[];

  @Column()
  shopImage: string;

  // @BeforeInsert()
  // defaultIsDelete() {
  //   this.isDelete = false;
  // }

}