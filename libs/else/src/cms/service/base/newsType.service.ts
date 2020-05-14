import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';
import { BaseService } from '@app/core/shared';

import { CreateNewsTypeDto, UpdateNewsTypeDto } from '../../dto';
import { NewsType } from '../../entity';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, InsertResult, Not } from 'typeorm';

@Injectable()
export class NewsTypeService extends BaseService<NewsType, CreateNewsTypeDto, UpdateNewsTypeDto> {

  constructor(
    @InjectRepository(NewsType)
    public repository: Repository<NewsType>,
  ) {
    super(repository)
  }
}
