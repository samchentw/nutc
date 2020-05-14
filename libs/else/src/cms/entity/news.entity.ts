import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { NewsType } from './newsType.entity';
import { BaseEntity } from '@app/core/shared';
@Entity()
export class News extends BaseEntity{

    @Column()
    title: string;

    @Column()
    subtitle: string;

    @Column({type:"text"})
    description: string;

    @Column()
    url:string;

    @Column()
    isActive: boolean;

    @ManyToOne(type => NewsType, NewsType => NewsType.news)
    newsType: NewsType;

}