import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from '@app/core/shared';

@Entity()
export class ConsumerEntity extends BaseEntity {

    @Column()
    point: number;

    @Column()
    userId:number;



}