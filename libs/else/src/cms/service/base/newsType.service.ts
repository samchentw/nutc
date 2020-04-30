import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';
import {BaseService} from '@app/core/shared';

import { CreateNewsTypeDto, UpdateNewsTypeDto } from '../../dto';
import { CmsNewsTypeEntity } from '../../entity';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, InsertResult, Not } from 'typeorm';

@Injectable()
export class NewsTypeService extends BaseService<CmsNewsTypeEntity,CreateNewsTypeDto,UpdateNewsTypeDto> {

  constructor(
    @InjectRepository(CmsNewsTypeEntity)
    public repository: Repository<CmsNewsTypeEntity>,
  ){
    super(repository)
  }
}
