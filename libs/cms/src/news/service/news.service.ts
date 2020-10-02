import { FileService } from '@app/core/file/service/file.service';
import { BaseService } from '@app/core/shared';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { classToPlain, plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { CreateNewsDto, UpdateNewsDto } from '../dto';
import { News as n } from '../dto/news/news.dto';
import { News, NewsDetail } from '../entity/news.entity';
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

    let details: NewsDetail[] = [];
    result.newsDetails = []
    for (let i = 0; i < input.newsDetails.length; i++) {
      let detail: NewsDetail = new NewsDetail();
      let imageData = await this.fileService.getFileUrlAndId(input.newsDetails[i].ImageId);
      detail.ImageId = imageData.id;
      detail.ImageUrl = imageData.url;
      detail.id = this.getRandom();
      detail.subtitle = input.newsDetails[i].subtitle;
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

    let details: NewsDetail[] = [];
    news.newsDetails = []
    for (let i = 0; i < input.newsDetails.length; i++) {
      let detail: NewsDetail = new NewsDetail();
      let imageData = await this.fileService.getFileUrlAndId(input.newsDetails[i].ImageId);
      detail.ImageId = imageData.id;
      detail.ImageUrl = imageData.url;
      
      if(input.newsDetails[i].id) detail.id = input.newsDetails[i].id;
      else detail.id=this.getRandom();
      detail.subtitle = input.newsDetails[i].subtitle;
      detail.description = input.newsDetails[i].description;
      detail.sequence = input.newsDetails[i].sequence;
      details.push(detail);
    }
    news.newsDetails = details;
    let types = await this.newsTypeService.get(input.newsTypeId);
    news.newsType = types;
    return await super.update(id, news)
  }

  private getRandom(): string {
    return Array(6)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');
  }

  async getAllByNewsTypeId(newsTypeId: number) {
    let newtype = await this.newsTypeService.get(newsTypeId);
    let entities = await this.repository.find({ newsType: newtype });
    let dto = plainToClass(n.NewsDto, entities, { excludeExtraneousValues: true });
    let result = classToPlain(dto);
    return result;
  }

  async getByid(id: number) {
    let entity = await this.repository.findOne(id);
    let dto = plainToClass(n.NewsDto, entity, { excludeExtraneousValues: true });
    let result = classToPlain(dto);
    return result;
  }


}
