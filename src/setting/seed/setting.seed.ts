import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import { SettingEntity } from '../entity/setting.entity';
import * as fs from 'fs';

export default class SettingUser implements Seeder {
    
  public async run(factory: Factory, connection: Connection): Promise<any> {      
    let settingCount = await connection.getRepository(SettingEntity).createQueryBuilder().getCount();
   
      var settings = this.readJson();
      for(var i = 0 ;i< settings.length;i++) {
        var find = await connection.getRepository(SettingEntity).findOne({key:settings[i].key});
        if(find == null){
          await connection
          .createQueryBuilder()
          .insert()
          .into(SettingEntity)
          .values(settings[i])
          .execute();
        }
      }     
  }

  readJson():SettingEntity[]{
    let data:SettingEntity[] = JSON.parse(fs.readFileSync(__dirname+"/data.json","utf8"));  
    return data;  
  }
}