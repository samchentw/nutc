import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';
import {BaseService} from '@app/core/shared';

import { CreateNewsDto,CreateNewsWithDetailDto, UpdateNewsDto, UpdateNewsTypeDto, CreateNewsTypeDto } from '../../dto';
import {CmsNewsEntity} from '../../entity';

import { plainToClass } from 'class-transformer';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, InsertResult, Not } from 'typeorm';
import { NewsTypeService } from './newsType.service';
@Injectable()
export class NewsService extends BaseService<CmsNewsEntity,CreateNewsDto,UpdateNewsDto> {

  constructor(
    @InjectRepository(CmsNewsEntity)
    public repository: Repository<CmsNewsEntity>,
    private newsTypeService:NewsTypeService
  ){
    super(repository)
  }
 
  async create(input:CreateNewsDto):Promise<CmsNewsEntity>{    
    var newsType=await this.newsTypeService.get(input.newsTypeId);    
    var result=plainToClass(CreateNewsWithDetailDto,input);
    result.newsType=newsType;      
    return await super.create(result);
  }

}
