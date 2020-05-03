
import { Entity, Column, OneToMany, BeforeInsert, JoinColumn, JoinTable, ManyToOne } from 'typeorm';
import { BaseEntity } from '@app/core/shared';
import { Expose } from 'class-transformer';
import { deliveryEnum, paymentEnum, orderStateEnum } from '../enum/enum';
import { OrderDetailEntity } from './orderDetail.entity';
import { ConsumerEntity } from 'src/consumer/entity/consumer.entity';

@Entity()
export class OrderEntity extends BaseEntity {

  @Column({ type: 'enum', enum: deliveryEnum })
  delivery: deliveryEnum;

  @Column({ type: 'enum', enum: paymentEnum })
  payment: paymentEnum;

  @Column()
  deliveryTime: Date;

  @Column({ type: 'enum', enum: orderStateEnum })
  state: orderStateEnum;

  @Column()
  address: string;

  @Column({ default: 0 })
  total: number;

  @ManyToOne(type => ConsumerEntity, x => x.order)
  consumer: ConsumerEntity;

  @OneToMany(type => OrderDetailEntity, od => od.order, { eager: true })
  @JoinColumn()
  orderDetail: OrderDetailEntity[];
}