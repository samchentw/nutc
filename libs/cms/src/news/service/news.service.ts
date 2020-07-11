import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';
import { BaseService } from '@app/core/shared';

import { CreateNewsDto, CreateNewsWithDetailDto, UpdateNewsDto, UpdateNewsTypeDto, CreateNewsTypeDto } from '../dto';
import { News, NewsDetail } from '../entity/news.entity';
import { News as n } from '../dto/news/news.dto'
import { plainToClass, classToPlain } from 'class-transformer';
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
    // if (input.imageIds && input.imageIds.length > 0) {
    //   result.images = await this.fileService.getFileUrlAndId(input.imageIds);
    // } else {
    //   result.images = [];
    // }
    let details: NewsDetail[] = [];
    result.newsDetails = []
    let detailImageIds = input.newsDetails.map(x => x.ImageId);
    let imageDatas = await this.fileService.getFileUrlAndId(detailImageIds);
    for (let i = 0; i < input.newsDetails.length; i++) {
      let detail: NewsDetail = new NewsDetail();
      detail.ImageId = imageDatas[i].id;
      detail.ImageUrl = imageDatas[i].url;
      detail.description = input.newsDetails[i].description;
      detail.sequence = input.newsDetails[i].sequence;
      details.push(detail);
    }

    result.newsDetails = details;
    result.newsType = newsType;
    return await super.create(result);
  }

  async update(id: number, input: UpdateNewsDto) {
    let news = plainToClass(News, input, { excludeExtraneousValues: true });
    // if (input.imageIds && input.imageIds.length > 0) {
    //   news.images = await this.fileService.getFileUrlAndId(input.imageIds);
    // }

    let details: NewsDetail[] = [];
    news.newsDetails = []
    let detailImageIds = input.newsDetails.map(x => x.ImageId);
    let imageDatas = await this.fileService.getFileUrlAndId(detailImageIds);
    for (let i = 0; i < input.newsDetails.length; i++) {
      let detail: NewsDetail = new NewsDetail();
      detail.ImageId = imageDatas[i].id;
      detail.ImageUrl = imageDatas[i].url;
      detail.description = input.newsDetails[i].description;
      detail.sequence = input.newsDetails[i].sequence;
      details.push(detail);
    }
    news.newsDetails = details;
    let types = await this.newsTypeService.get(input.newsTypeId);
    news.newsType = types;
    return await super.update(id, news)
  }


  async getAllByNewsTypeId(newsTypeId: number) {
    let newtype = await this.newsTypeService.get(newsTypeId);
    let entities = await this.repository.find({ newsType: newtype });
    let dto = plainToClass(n.NewsDto, entities, { excludeExtraneousValues: true });
    let result = classToPlain(dto);
    return result;
  }


}
