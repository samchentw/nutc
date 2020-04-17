import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import { TagEntity } from '../entity/tag.entity'
import { ArticleEntity } from '../entity/article.entity';
import * as fs from 'fs';

export default class CreateArticle implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {      
    let tagCount = await connection.getRepository(TagEntity).createQueryBuilder().getCount();
    if(tagCount == 0)
    {
      let data:TagEntity[] = this.readJson();
      await connection
      .createQueryBuilder()
      .insert()
      .into(TagEntity)
      .values(data)
      .execute()
    }    
  }


   readJson():TagEntity[]{
    let data:TagEntity[] = JSON.parse(fs.readFileSync(__dirname+"/data.json","utf8"));  
    return data;  
  }
}