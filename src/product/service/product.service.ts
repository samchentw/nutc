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
import { ProductTypeService } from './productType.service';
import { ProductPageDto, ProductQueryPageDto } from '../dto/product.dto';
@Injectable()
export class ProductService extends BaseService<ProductEntity, CreateProductDto, UpdateProductDto> {

    constructor(
        @InjectRepository(ProductEntity)
        public repository: Repository<ProductEntity>,
        private readonly fileService: FileService,
        private readonly productTypeService: ProductTypeService,
    ) {
        super(repository)
    }

    private async findImage(imageIds: number[]): Promise<string> {
        var images = await this.fileService.findByIds(imageIds);
        return JSON.stringify(images);
    }

    async create(input: CreateProductDto) {
        var product = plainToClass(ProductEntity, input);
        var types = await this.productTypeService.getypes(input.productTypeIds);
        product.ProductImage = await this.findImage(input.imageIds);
        product.isDelete = false;
        product.productTypes = types;
        return await super.create(product)
    }

    async update(id: number, input: UpdateProductDto) {
        var newproduct = plainToClass(ProductEntity, input, { excludeExtraneousValues: true });
        if (input.imageIds && input.imageIds.length > 0) {
            newproduct.ProductImage = await this.findImage(input.imageIds);
        }
        var types = await this.productTypeService.getypes(input.productTypeIds);
        newproduct.productTypes = types;
        return await super.update(id, newproduct)
    }

     // overriding super class method
  async page(input:ProductQueryPageDto, useIsDelete = false):Promise<[ProductEntity[],number]>{
    var product= this.repository.createQueryBuilder("x")
        .leftJoinAndSelect("x.productTypes", "productTypes");
        
    if(input.productTypeId!=0) product.where("productTypes.id = :id",{ id:input.productTypeId });
    
    console.log(input.productTypeId)
    if (useIsDelete) product.andWhere("isDelete=false")
    var result =await product    
    .skip(input.skip)
    .take(input.take)    
    .orderBy("x.createTime","DESC")
    .addOrderBy("x.id","DESC")        
    .getManyAndCount()          
    return result;
 }
}