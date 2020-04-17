import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { CmsNewsTypeEntity } from './cms.newsType.entity';
import { BaseEntity } from '../../shared';
@Entity()
export class CmsNewsEntity extends BaseEntity{

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

    @ManyToOne(type => CmsNewsTypeEntity, NewsType => NewsType.news)
    newsType: CmsNewsTypeEntity;

}