
import { Entity, Column, BaseEntity, BeforeInsert, JoinColumn, JoinTable, ManyToOne, ManyToMany, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
// import { BaseEntity } from '@app/core/shared';
import { Expose } from 'class-transformer';
import { ProductType } from './productType.entity';
@Entity()
export class Product extends BaseEntity {

  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  @CreateDateColumn({ type: 'timestamp' })
  @Expose()
  createTime: Date;

  @Column({ length: 30, unique: true })
  @Expose()
  name: string;

  @Column()
  @Expose()
  price: number;

  @Column()
  @Expose()
  description: string;

  @Column()
  @Expose()
  isDelete: boolean;

  @Column()
  @Expose()
  isSell: boolean;

  @Column()
  @Expose()
  productImage: string;

  @ManyToOne(type => ProductType, { eager: true })
  @JoinTable()
  productTypes: ProductType;

}