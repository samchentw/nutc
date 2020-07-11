import { FileService } from '@app/core/file/service/file.service';
import { BaseService } from '@app/core/shared';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { CreateProductDto } from '../dto/create-product.dto';
import { ProductQueryPageDto } from '../dto/product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Product } from '../entity/product.entity';
import { ProductTypeService } from './productType.service';


@Injectable()
export class ProductService extends BaseService<Product, CreateProductDto, UpdateProductDto> {

    constructor(
        @InjectRepository(Product)
        public repository: Repository<Product>,
        private readonly fileService: FileService,
        private readonly productTypeService: ProductTypeService,
    ) {
        super(repository)
    }



    async create(input: CreateProductDto) {
        var product = plainToClass(Product, input);
        var types = await this.productTypeService.get(input.productTypeId);
        product.productImage = await this.fileService.getFileUrlAndIdStr(input.imageIds);
        product.isDelete = false;
        product.productTypes = types;
        return await super.create(product)
    }

    async update(id: number, input: UpdateProductDto) {
        var or = await this.get(id);
        var newproduct = plainToClass(Product, input, { excludeExtraneousValues: true });
        if (input.imageIds && input.imageIds.length > 0) {
            newproduct.productImage = await this.fileService.getFileUrlAndIdStr(input.imageIds);
        }else{
            newproduct.productImage = "[]";
        }
        var types = or.productTypes
        newproduct.productTypes = types;
        return await super.update(id, newproduct)
    }

    // overriding super class method
    async page(input: ProductQueryPageDto, useIsDelete = false): Promise<[Product[], number]> {
        var product = this.repository.createQueryBuilder("x")
            .leftJoinAndSelect("x.productTypes", "productTypes");
        if (input.productTypeId != 0) product.where("productTypes.id = :id", { id: input.productTypeId });
        if (input.showIsSell == 'false') product.andWhere("isSell = true");
        if (useIsDelete) product.andWhere("isDelete=false")
        var result = await product
            .skip(input.skip)
            .take(input.take)
            .orderBy("x.createTime", "DESC")
            .addOrderBy("x.id", "DESC")
            .getManyAndCount()
        return result;
    }
}