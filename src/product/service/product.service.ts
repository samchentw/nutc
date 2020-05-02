import { Injectable, Inject } from '@nestjs/common';

import { InjectRepository, } from '@nestjs/typeorm';
import { Repository, Entity } from 'typeorm';
import * as _ from 'lodash';
import { ExcelService, BaseService, PageDto } from '@app/core/shared';

import { FileService } from '@app/core/file/service/file.service';
import { plainToClass, classToPlain, classToClass, plainToClassFromExist } from 'class-transformer';
import { ProductEntity } from '../entity/product.entity';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.data';
@Injectable()
export class ProductService extends BaseService<ProductEntity, CreateProductDto, UpdateProductDto> {

    constructor(
        @InjectRepository(ProductEntity)
        public repository: Repository<ProductEntity>,
        private readonly fileService: FileService,
    ) {
        super(repository)
    }

    private async findImage(imageIds: number[]): Promise<string> {
        var images = await this.fileService.findByIds(imageIds);
        return JSON.stringify(images);
    }

    async create(input: CreateProductDto) {
        var product = plainToClass(ProductEntity, input);
        product.ProductImage = await this.findImage(input.imageIds);
        product.isDelete = false;
        return await super.create(product)
    }

    async update(id: number, input: UpdateProductDto) {
        var newproduct = plainToClass(ProductEntity, input, { excludeExtraneousValues: true });
        if (input.imageIds && input.imageIds.length > 0) {
            newproduct.ProductImage = await this.findImage(input.imageIds);
        }
        return await super.update(id, newproduct)
    }
}