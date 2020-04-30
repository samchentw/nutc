import {Entity, JoinColumn, Column, OneToMany} from "typeorm";
import { CmsNewsEntity } from './cms.news.entity';
import { BaseEntity } from '@app/core/shared';
@Entity()
export class CmsNewsTypeEntity extends BaseEntity{

    @Column()
    name: string;   
    
    @OneToMany(type => CmsNewsEntity, News => News.newsType)
    @JoinColumn()
    news: CmsNewsEntity[];

}