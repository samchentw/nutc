import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';
import { BaseService } from '@app/core/shared';

import { CreateNewsTypeDto, UpdateNewsTypeDto } from '../dto';
import { NewsType } from '../entity/newsType.entity';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, InsertResult, Not } from 'typeorm';
import * as fs from 'fs';

@Injectable()
export class NewsTypeService extends BaseService<NewsType, CreateNewsTypeDto, UpdateNewsTypeDto> {

  constructor(
    @InjectRepository(NewsType)
    public repository: Repository<NewsType>,
  ) {
    super(repository)
  }

  async seed() {
    var count = await this.repository.count();
    if (count == 0) {
      let data: NewsType[] = JSON.parse(fs.readFileSync(process.cwd() + "/seeds/newsType.json", "utf8"));
      await this.repository.save(data);
    }
  }
}
