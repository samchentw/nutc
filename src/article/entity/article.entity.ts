import {Entity,JoinTable, ManyToMany,CreateDateColumn, Column, ManyToOne, JoinColumn} from 'typeorm';
import { BaseEntity } from '@app/core/shared';
import { TagEntity } from './tag.entity'
@Entity()
export class ArticleEntity extends BaseEntity{
    @Column()
    title:string;
    
    @Column({type:"text"})
    text:string;

    @ManyToMany(type => TagEntity,{eager:true})
    @JoinTable()
    tags: TagEntity[];
}
