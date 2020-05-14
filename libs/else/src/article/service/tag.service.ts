import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';
import { BaseService, dataDuplicationException } from '@app/core/shared';

import { CreateTagDto } from '../dto';
import { Tag } from '../entity/tag.entity';

import { InjectRepository, } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TagService extends BaseService<Tag, CreateTagDto, CreateTagDto> {

  constructor(
    @InjectRepository(Tag)
    public repository: Repository<Tag>,
  ) {
    super(repository)
  }
  async create(input: CreateTagDto) {
    var check = await this.repository.findOne({ title: input.title });
    if (check) throw new dataDuplicationException();;
    return super.create(input);
  }

  getTags(ids: number[]) {
    var tags = this.repository.findByIds(ids);
    return tags;
  }
}