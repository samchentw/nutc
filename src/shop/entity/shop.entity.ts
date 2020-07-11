
// import { BaseEntity } from '@app/core/shared';
import { Expose } from 'class-transformer';
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ShopTypeEnum } from '../enum/enum';
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

  @Column({ type: 'enum', enum: ShopTypeEnum })
  @Expose()
  shopType: ShopTypeEnum;

  @Column()
  @Expose()
  description: string;

  @Column()
  @Expose()
  remark: string;

  @Column()
  @Expose()
  isDelete: boolean;

  @Column()
  @Expose()
  shopImage: string;

}