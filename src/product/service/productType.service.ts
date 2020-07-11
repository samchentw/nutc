import { BaseService } from '@app/core/shared';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductTypeDto } from '../dto/create-productType.dto';
import { ProductType } from '../entity/productType.entity';

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