import {ObjectID, ObjectIdColumn, PrimaryGeneratedColumn,CreateDateColumn, Column, ManyToOne, JoinColumn} from 'typeorm';

export abstract  class BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;   
    // @ObjectIdColumn()
    // id: ObjectID;
    @CreateDateColumn({ type: 'timestamp' })
    createTime:Date;

}
