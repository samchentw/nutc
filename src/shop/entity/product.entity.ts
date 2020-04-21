import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../shared';

@Entity()
export class ProductEntity extends BaseEntity{  

  @Column({ length: 30, unique: true })
  name: string;

}