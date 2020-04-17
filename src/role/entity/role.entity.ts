
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany} from 'typeorm';
import { BaseEntity } from '../../shared';

@Entity()
export class Role extends BaseEntity{

  @Column({ length: 20 ,unique:true})
  name: string;

  @Column()
  description:string;

  
}
