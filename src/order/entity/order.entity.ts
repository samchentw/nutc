
import { Entity, Column, OneToMany, BeforeInsert, JoinColumn, JoinTable, ManyToOne } from 'typeorm';
import { BaseEntity } from '@app/core/shared';
import { Expose, Type } from 'class-transformer';
import { deliveryEnum, paymentEnum, orderStateEnum } from '../enum/enum';
import { OrderDetailEntity } from './orderDetail.entity';
import { ConsumerEntity } from 'src/consumer/entity/consumer.entity';

@Entity()
export class OrderEntity extends BaseEntity {

  @Column({ type: 'enum', enum: deliveryEnum })
  @Expose()
  delivery: deliveryEnum;

  @Column({ type: 'enum', enum: paymentEnum })
  @Expose()
  payment: paymentEnum;

  @Column()
  @Expose()
  deliveryTime: Date;

  @Column({ type: 'enum', enum: orderStateEnum })
  @Expose()
  state: orderStateEnum;

  @Column()
  @Expose()
  address: string;

  @Column({ default: 0 })
  @Expose()
  total: number;

  @ManyToOne(type => ConsumerEntity, x => x.order)
  consumer: ConsumerEntity;

  @OneToMany(type => OrderDetailEntity, od => od.order, { eager: true })
  @JoinColumn()
  @Type(() => OrderDetailEntity)
  orderDetail: OrderDetailEntity[];
}