import { Injectable, Inject } from '@nestjs/common';

import { InjectRepository, } from '@nestjs/typeorm';
import { Repository, Entity } from 'typeorm';
import * as _ from 'lodash';
import { ExcelService, BaseService, PageDto } from '@app/core/shared';

import { FileService } from '@app/core/file/service/file.service';
import { plainToClass, classToPlain, classToClass, plainToClassFromExist } from 'class-transformer';
import { ProductTypeEntity } from '../entity/productType.entity';
import { CreateProductTypeDto } from '../dto/create-productType.dto';
@Injectable()
export class ProductTypeService extends BaseService<ProductTypeEntity, CreateProductTypeDto, CreateProductTypeDto> {
    constructor(
        @InjectRepository(ProductTypeEntity)
        public repository: Repository<ProductTypeEntity>,
    ) {
        super(repository)
    }

    getypes(ids:number[]){
        var types=this.repository.findByIds(ids);    
        return types;
      }

}