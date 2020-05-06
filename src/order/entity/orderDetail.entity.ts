
import { Entity, Column, OneToMany, BeforeInsert, JoinColumn, JoinTable, ManyToOne } from 'typeorm';
import { BaseEntity } from '@app/core/shared';
import { Expose } from 'class-transformer';
import { OrderEntity } from './order.entity';
@Entity()
export class OrderDetailEntity extends BaseEntity {

  @Column()
  @Expose()
  count: number;


  @Column("simple-json")
  product: { name: string, price: number, ProductImage: string };

  @ManyToOne(type => OrderEntity, order => order.orderDetail)
  @JoinColumn()
  order: OrderEntity;
}