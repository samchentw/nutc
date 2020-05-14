import { Entity, Column } from "typeorm";
// import {ArticleEntity} from "./article.entity";
import { BaseEntity } from '@app/core/shared';
@Entity()
export class ProductType extends BaseEntity {
    @Column({ unique: true })
    name: string;
}