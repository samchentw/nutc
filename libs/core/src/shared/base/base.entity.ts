import {ObjectID, ObjectIdColumn, PrimaryGeneratedColumn,CreateDateColumn, Column, ManyToOne, JoinColumn} from 'typeorm';
import { Expose } from 'class-transformer';

export abstract  class BaseEntity{
     // @ObjectIdColumn()
    // id: ObjectID;
    
    @PrimaryGeneratedColumn()
    @Expose()
    id:number;   
   
    @CreateDateColumn({ type: 'timestamp' })
    @Expose()
    createTime:Date;

}
