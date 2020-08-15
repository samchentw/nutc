import { Entity, Column, BaseEntity, OneToMany, JoinColumn, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { Order } from '../../order/entity/order.entity';
@Entity()
export class Consumer extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ type: 'timestamp' })
    createTime: Date;

    @Column()
    userId: string;

    // @Column()
    // point: number;

    // @Column("simple-array")
    // order: number[];

    @OneToMany(type => Order, order => order.consumer, { eager: true })
    @JoinColumn()
    order: Order[];

}