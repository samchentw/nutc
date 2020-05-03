
import { Entity, Column, OneToMany, BeforeInsert, JoinColumn, JoinTable, ManyToOne } from 'typeorm';
import { BaseEntity } from '@app/core/shared';
import { Expose } from 'class-transformer';
import { OrderEntity } from './order.entity';
@Entity()
export class OrderDetailEntity extends BaseEntity {

  @Column({ length: 30, unique: true })
  @Expose()
  name: string;


  @Column("simple-json")
  product: { name: string, price: number, type: string, ProductImage: string };

  @ManyToOne(type => OrderEntity, order => order.orderDetail)
  @JoinColumn()
  order: OrderEntity;
}