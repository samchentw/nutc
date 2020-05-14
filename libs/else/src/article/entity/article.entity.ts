import {Entity,JoinTable, ManyToMany,CreateDateColumn, Column, ManyToOne, JoinColumn} from 'typeorm';
import { BaseEntity } from '@app/core/shared';
import { Tag } from './tag.entity'
@Entity()
export class Article extends BaseEntity{
    @Column()
    title:string;
    
    @Column({type:"text"})
    text:string;

    @ManyToMany(type => Tag,{eager:true})
    @JoinTable()
    tags: Tag[];
}
