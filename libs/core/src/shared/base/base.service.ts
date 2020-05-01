import { Injectable } from '@nestjs/common';
import { Repository, InsertResult, UpdateResult, DeleteResult } from 'typeorm';
import { PageDto } from '../dto/page.dto';
import { BaseEntity } from './base.entity';
import * as _ from 'lodash';
@Injectable()
export abstract class BaseService<Entity, CreateDto, UpdateDto>{

  constructor(
    public repository: Repository<Entity>,
  ) {

  }

  async create(entity: CreateDto | Entity): Promise<Entity> {
    return await this.repository.save(entity);
  }

  async get(id): Promise<Entity> {
    return await this.repository.findOne(id);
  }

  async getAll(): Promise<Entity[]> {
    return await this.repository.find();
  }

  async update(id: number, input: UpdateDto | Entity): Promise<UpdateResult> {
    return await this.repository.update(id, input);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.repository.delete(id);
  }

  async page(input: PageDto, useIsDelete = false) {
    var result = this.repository
      .createQueryBuilder("x")
      .skip(input.skip)
      .take(input.take)
      .orderBy("createTime", "DESC")
      .addOrderBy("id", "DESC");

    if (useIsDelete) result.where("isDelete=false")
    return result.getManyAndCount();;
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}