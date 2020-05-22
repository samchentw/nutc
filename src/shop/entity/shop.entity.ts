
import { Entity, Column, OneToMany, BaseEntity, JoinColumn, JoinTable, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
// import { BaseEntity } from '@app/core/shared';
import { Expose } from 'class-transformer';
@Entity()
export class Shop extends BaseEntity {

  @PrimaryGeneratedColumn()
  @Expose()
  id:number;   
  
  @CreateDateColumn({ type: 'timestamp' })
  @Expose()
  createTime:Date;

  @Column({ length: 30, unique: true })
  @Expose()
  name: string;

  @Column()
  @Expose()
  phone: string;

  @Column()
  @Expose()
  address: string;

  @Column()
  @Expose()
  description: string;

  @Column()
  @Expose()
  remark: string;

  @Column()
  @Expose()
  isDelete: boolean;

  // @OneToMany(type => ProductEntity, productEntity => productEntity.shop)
  // Product: ProductEntity[];

  @Column()
  @Expose()
  shopImage: string;

  // @BeforeInsert()
  // defaultIsDelete() {
  //   this.isDelete = false;
  // }

}