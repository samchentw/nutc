
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Userinfo } from './userinfo.entity';

// import {File} from '../../file/@entity/file.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 20 })
  account: string;

  @Column({ length: 20, select: false })
  password: string;

  @OneToOne(type => Userinfo, userinfo => userinfo.user)
  @JoinColumn()
  userinfo: Userinfo;
}