import { Entity, Column, OneToMany, CreateDateColumn, PrimaryGeneratedColumn, BaseEntity } from "typeorm";
import { Product } from './product.entity';
@Entity()
export class ProductType extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ type: 'timestamp' })
    createTime: Date;

    @Column({ unique: true })
    name: string;

    @OneToMany(type => Product, product => product.productTypes)
    product: Product[];
}