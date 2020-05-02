import {ObjectID, ObjectIdColumn, PrimaryGeneratedColumn,CreateDateColumn, Column, ManyToOne, JoinColumn} from 'typeorm';
import { Expose } from 'class-transformer';

export abstract  class BaseEntity{
    @PrimaryGeneratedColumn()
    @Expose()
    id:number;   
    // @ObjectIdColumn()
    // id: ObjectID;
    @CreateDateColumn({ type: 'timestamp' })
    @Expose()
    createTime:Date;

}
