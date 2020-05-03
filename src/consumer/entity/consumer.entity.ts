import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseEntity } from '@app/core/shared';
import { OrderEntity } from '../../order/entity/order.entity';
@Entity()
export class ConsumerEntity extends BaseEntity {

    @Column()
    userId: string;

    @Column()
    point: number;

    // @Column("simple-array")
    // order: number[];

    @OneToMany(type => OrderEntity, order => order.consumer, { eager: true })
    @JoinColumn()
    order: OrderEntity[];

}