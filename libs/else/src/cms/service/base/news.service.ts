import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';
import { BaseService } from '@app/core/shared';

import { CreateNewsDto, CreateNewsWithDetailDto, UpdateNewsDto, UpdateNewsTypeDto, CreateNewsTypeDto } from '../../dto';
import { News } from '../../entity';

import { plainToClass } from 'class-transformer';
import { InjectRepository } from '@nestjs/typeorm';
import { FileService } from '@app/core/file/service/file.service';
import { Repository, UpdateResult, InsertResult, Not } from 'typeorm';
import { NewsTypeService } from './newsType.service';
@Injectable()
export class NewsService extends BaseService<News, CreateNewsDto, UpdateNewsDto> {

  constructor(
    @InjectRepository(News)
    public repository: Repository<News>,
    private newsTypeService: NewsTypeService,
    private fileService: FileService,
  ) {
    super(repository)
  }

  async create(input: CreateNewsDto): Promise<News> {
    var newsType = await this.newsTypeService.get(input.newsTypeId);
    var result = plainToClass(News, input);
    result.Images = await this.fileService.getFileUrlAndIdStr(input.imageIds);
    result.newsType = newsType;
    return await super.create(result);
  }

  async update(id: number, input: UpdateNewsDto) {
    var news = plainToClass(News, input, { excludeExtraneousValues: true });
    if (input.imageIds && input.imageIds.length > 0) {
      news.Images = await this.fileService.getFileUrlAndIdStr(input.imageIds);
    }
    var types = await this.newsTypeService.get(input.newsTypeId);
    news.newsType = types;
    return await super.update(id, news)
  }

}
