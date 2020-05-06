import { Controller, Get, Post, Body, Put, Param, Delete, Query, UsePipes, Res, Header, Req, UseGuards } from '@nestjs/common';
import { ValidationPipe, RolesGuard, Roles } from '@app/core/shared';
import { ApiTags, ApiQuery, ApiParam, ApiDefaultResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ProductDto, ProductPageDto } from '../dto/product.dto';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.data';
import { ProductTypeService } from '../service/productType.service';
import { CreateProductTypeDto } from '../dto/create-productType.dto';

@ApiTags("ProductType")
@UseGuards(RolesGuard) 
@Controller("productType")
export class ProductTypeController {
  constructor(
    private readonly productTypeService: ProductTypeService,
  ) { }

  @Get("getAll")
  getAll() {
    return this.productTypeService.getAll();
  }

  @Get("get/:id")
  @ApiParam({ name: "id" })
  get(@Param('id') id) {
    return this.productTypeService.get(id);
  }

  @Post("create") 
  @ApiBearerAuth()
  @Roles("admin")
  @UsePipes(new ValidationPipe())
  create(@Body() input: CreateProductTypeDto) {
    return this.productTypeService.create(input);
  }

  @Put(':id')
  @ApiBearerAuth()
  @Roles("admin")
  @ApiParam({ name: 'id' })
  update(@Param('id') id, @Body() input: CreateProductTypeDto) {
    return this.productTypeService.update(id, input);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @Roles("admin")
  @ApiParam({ name: 'id' })
  delete(@Param('id') id) {
    return this.productTypeService.delete(id);
  }
}