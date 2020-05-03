import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from '@app/core/shared';

@Entity()
export class ConsumerEntity extends BaseEntity {

    @Column()
    userId: string;

    @Column()
    point: number;

    @Column("simple-array")
    order: number[];

}