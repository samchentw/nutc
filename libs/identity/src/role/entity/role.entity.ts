
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, CreateDateColumn} from 'typeorm';
import { BaseEntity } from '@app/core/shared';

@Entity()
export class Role{

  @PrimaryGeneratedColumn()
  id:number;

  @CreateDateColumn({ type: 'timestamp' })
  createTime:Date;
  
  @Column({ length: 20 ,unique:true})
  name: string;

  @Column()
  description:string;

  
}
