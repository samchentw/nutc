import { Injectable, Inject } from '@nestjs/common';

import { InjectRepository, } from '@nestjs/typeorm';
import { Repository, Entity } from 'typeorm';
import * as _ from 'lodash';
import { ExcelService, BaseService, PageDto } from '@app/core/shared';
import { ProductType } from '../entity/productType.entity';
import { CreateProductTypeDto } from '../dto/create-productType.dto';
@Injectable()
export class ProductTypeService extends BaseService<ProductType, CreateProductTypeDto, CreateProductTypeDto> {
    constructor(
        @InjectRepository(ProductType)
        public repository: Repository<ProductType>,
    ) {
        super(repository)
    }

    getypes(ids: number[]) {
        var types = this.repository.findByIds(ids);
        return types;
    }

}