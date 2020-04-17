import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import { Role } from '../entity/role.entity';

import * as fs from 'fs';

export default class CreateRole implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {      
    let roleCount = await connection.getRepository(Role).createQueryBuilder().getCount();
    if(roleCount == 0)
    {
      let data:Role[] = this.readJson();
      await connection
      .createQueryBuilder()
      .insert()
      .into(Role)
      .values(data)
      .execute()
    }    
  }


   readJson():Role[]{
    let data:Role[] = JSON.parse(fs.readFileSync(__dirname+"/data.json","utf8"));  
    return data;  
  }
}