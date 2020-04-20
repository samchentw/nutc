
import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../shared';

@Entity()
export class ShopEntity extends BaseEntity{  

  @Column({ length: 30, unique: true })
  name: string;

  @Column()
  phone: string;

  @Column()
  description: string;
  
  @Column()
  delete: boolean;
}