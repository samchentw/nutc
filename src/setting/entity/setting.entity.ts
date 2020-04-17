
import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../shared';

@Entity()
export class SettingEntity extends BaseEntity{  

  @Column({ length: 30, unique: true })
  key: string;

  @Column()
  value: string;

  @Column()
  description: string;
  
  @Column()
  enable: boolean;
}