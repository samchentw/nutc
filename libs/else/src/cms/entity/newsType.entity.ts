import {Entity, JoinColumn, Column, OneToMany} from "typeorm";
import { News } from './news.entity';
import { BaseEntity } from '@app/core/shared';
@Entity()
export class NewsType extends BaseEntity{

    @Column()
    name: string;   
    
    @OneToMany(type => News, News => News.newsType)
    @JoinColumn()
    news: News[];

}