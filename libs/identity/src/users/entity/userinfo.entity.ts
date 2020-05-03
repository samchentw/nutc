
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinColumn, JoinTable } from 'typeorm';
import { Role } from '../../role/entity/role.entity';
import { genderDataEnum } from '../enum/enum';
@Entity()
export class Userinfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  name: string;

  @Column({ type: 'enum', enum: genderDataEnum })
  gender: genderDataEnum;

  @Column()
  birthday: Date;

  @Column({ length: 30 })
  address: string;

  @Column({ length: 30 })
  email: string;

  @ManyToMany(type => Role, role => role.name)
  @JoinTable()
  role: Role[];

}

