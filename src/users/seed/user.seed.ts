import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import { User } from '../entity/user.entity';
import { Userinfo } from '../entity/userinfo.entity';
import { Role } from '../../role/entity/role.entity';
import * as fs from 'fs';
import { genderDataEnum } from '../../shared';

export default class CreateUser implements Seeder {
    
  public async run(factory: Factory, connection: Connection): Promise<any> {      
    let userCount = await connection.getRepository(User).createQueryBuilder().getCount();
    if(userCount == 0)
    {
        var roles:Role[]=await connection.getRepository(Role).createQueryBuilder().getMany();
        
        var userinfoData ={
            name:"admin",
            gender:genderDataEnum.男性,
            birthday:'1996-11-29',
            address:"台中市",
            email:"nutc@gmail.com",
            role:roles
        }
    
        var userinfo = await connection
        .getRepository(Userinfo)
        .save(userinfoData);
        

        var user = new User();
        user.account = "admin";
        user.password = "admin";
        user.userinfo = userinfo;

        await connection
        .getRepository(User).save(user)
    }    
  }
}