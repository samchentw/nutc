import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';
import { BaseService } from '@app/core/shared';

import { CreateArticleDto, UpdateArticleDto, ArticlePageDto, ArticleQueryPageDto } from '../dto';
import { Article } from '../entity/article.entity';

import { InjectRepository, } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TagService } from './tag.service'
@Injectable()
export class ArticleService extends BaseService<Article, CreateArticleDto, UpdateArticleDto> {

  constructor(
    private tagService: TagService,
    @InjectRepository(Article)
    public repository: Repository<Article>,
  ) {
    super(repository)
    // this.test()
  }

  async create(input: CreateArticleDto) {
    var articleEntity = new Article();
    articleEntity.tags = [];
    articleEntity.text = input.text;
    articleEntity.title = input.title;
    articleEntity.tags = await this.tagService.getTags(input.tags);
    return await this.repository.save(articleEntity);
  }


  async update1(id, input: UpdateArticleDto) {
    var articleEntity = await this.get(id);
    articleEntity.text = input.text;
    articleEntity.title = input.title;
    articleEntity.tags = await this.tagService.getTags(input.tags);
    return await this.repository.save(articleEntity);
  }


  // overriding super class method
  async page(input: ArticleQueryPageDto): Promise<[Article[], number]> {
    var articles = this.repository.createQueryBuilder("x")
      .leftJoinAndSelect("x.tags", "tag");

    if (input.tagId != 0) articles.where("tag.id = :id", { id: input.tagId });
    if (input.title) articles.andWhere("x.title like :text", { text: '%' + input.title + '%' });
    if (input.text) articles.andWhere("x.text like :text", { text: '%' + input.text + '%' });

    var result = await articles
      .skip(input.skip)
      .take(input.take)
      .orderBy("x.createTime", "DESC")
      .addOrderBy("x.id", "DESC")
      .getManyAndCount()
    return result;
  }
}
