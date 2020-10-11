import { Entity, Column, BaseEntity, OneToMany, JoinColumn, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { Order } from '../../order/entity/order.entity';


export class newsJson {
    time: Date;
    newsId: number;
    newsDetailId: string;
    isComplete: boolean;
}

@Entity()
export class Consumer extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ type: 'timestamp' })
    createTime: Date;

    @Column()
    userId: string;

    @OneToMany(type => Order, order => order.consumer, { eager: true })
    @JoinColumn()
    order: Order[];

    @Column({ nullable: true })
    selectDate: Date;


    @Column("simple-json")
    newsJson: newsJson[];


}