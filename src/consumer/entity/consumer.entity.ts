import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseEntity } from '@app/core/shared';
import { Order } from '../../order/entity/order.entity';
@Entity()
export class Consumer extends BaseEntity {

    @Column()
    userId: string;

    @Column()
    point: number;

    // @Column("simple-array")
    // order: number[];

    @OneToMany(type => Order, order => order.consumer, { eager: true })
    @JoinColumn()
    order: Order[];

}