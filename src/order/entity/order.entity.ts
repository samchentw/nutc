
import { Entity, Column, OneToMany, BaseEntity, JoinColumn, JoinTable, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { Expose, Type } from 'class-transformer';
import { deliveryEnum, paymentEnum, orderStateEnum } from '../enum/enum';
import { OrderDetail } from './orderDetail.entity';
import { Consumer } from 'src/consumer/entity/consumer.entity';

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  @CreateDateColumn({ type: 'timestamp' })
  @Expose()
  createTime: Date;



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

  @ManyToOne(type => Consumer, x => x.order)
  consumer: Consumer;

  @OneToMany(type => OrderDetail, od => od.order, { eager: true })
  @JoinColumn()
  @Type(() => OrderDetail)
  orderDetail: OrderDetail[];
}