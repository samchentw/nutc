
import { Entity, Column, OneToMany, BaseEntity, JoinColumn, JoinTable, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { Expose } from 'class-transformer';
import { Order } from './order.entity';
@Entity()
export class OrderDetail extends BaseEntity {

  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  @CreateDateColumn({ type: 'timestamp' })
  @Expose()
  createTime: Date;

  @Column()
  @Expose()
  count: number;


  @Column("simple-json")
  product: { name: string, price: number, productImage: string };

  @ManyToOne(type => Order, order => order.orderDetail)
  @JoinColumn()
  order: Order;
}