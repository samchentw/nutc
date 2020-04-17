import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';
import {BaseService, dataDuplicationException} from '../../../shared';

import { CreateTagDto} from '../../dto';
import { TagEntity } from '../../entity/tag.entity';

import { InjectRepository, } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TagService extends BaseService<TagEntity,CreateTagDto,CreateTagDto> {

  constructor(
    @InjectRepository(TagEntity)
    public repository: Repository<TagEntity>,
  ){
    super(repository)  
  }
  async create(input:CreateTagDto){
    var check = await this.repository.findOne({title:input.title});    
    if(check) throw new dataDuplicationException();;
    return super.create(input);
  }

  getTags(ids:number[]){
    var tags=this.repository.findByIds(ids);    
    return tags;
  }
}