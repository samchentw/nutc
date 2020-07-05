import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';
import { BaseService } from '@app/core/shared';

import { CreateNewsDto, CreateNewsWithDetailDto, UpdateNewsDto, UpdateNewsTypeDto, CreateNewsTypeDto } from '../dto';
import { News } from '../entity/news.entity';

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
    let newsType = await this.newsTypeService.get(input.newsTypeId);
    let result = plainToClass(News, input);
    if (input.imageIds && input.imageIds.length > 0) {
      result.images = await this.fileService.getFileUrlAndIdStr(input.imageIds);
    } else {
      result.images = "[]";
    }

    let detailImageIds = input.newsDetails.map(x => x.ImageId);
    let imageDatas = await this.fileService.getFileUrlAndId(detailImageIds);
    for (let i = 0; i < imageDatas.length; i++) {
      //imageDatas[i].id
    }

    result.newsType = newsType;
    return await super.create(result);
  }

  async update(id: number, input: UpdateNewsDto) {
    let news = plainToClass(News, input, { excludeExtraneousValues: true });
    if (input.imageIds && input.imageIds.length > 0) {
      news.images = await this.fileService.getFileUrlAndIdStr(input.imageIds);
    }
    let types = await this.newsTypeService.get(input.newsTypeId);
    news.newsType = types;
    return await super.update(id, news)
  }


  async getAllByNewsTypeId(newsTypeId: number) {
    let newtype = await this.newsTypeService.get(newsTypeId);
    return this.repository.find({ newsType: newtype });
  }


}