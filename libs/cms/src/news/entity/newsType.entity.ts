import {Entity, JoinColumn, Column, OneToMany, PrimaryGeneratedColumn, CreateDateColumn, BaseEntity} from "typeorm";
import { News } from './news.entity';

@Entity()
export class NewsType extends BaseEntity{

    @PrimaryGeneratedColumn()
    id:number;   
   
    @CreateDateColumn({ type: 'timestamp' })
    createTime:Date;

    @Column()
    name: string;   
    
    @OneToMany(type => News, News => News.newsType)
    @JoinColumn()
    news: News[];

}