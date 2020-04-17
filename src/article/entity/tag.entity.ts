import {Entity, Column} from "typeorm";
// import {ArticleEntity} from "./article.entity";
import { BaseEntity } from '../../shared';
@Entity()
export class TagEntity extends BaseEntity{
    @Column({unique:true})
    title: string;
}