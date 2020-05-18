import { Entity, Column, OneToMany } from "typeorm";
// import {ArticleEntity} from "./article.entity";
import { BaseEntity } from '@app/core/shared';
import { Product } from './product.entity';
@Entity()
export class ProductType extends BaseEntity {
    @Column({ unique: true })
    name: string;

    @OneToMany(type => Product, product => product.productTypes)
    product: Product[];
}