import { Controller, Get, Post, Body, Put, Param, Delete, Query, UsePipes, Res, Header, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { Roles, RolesGuard } from '@app/core/shared';
import { ApiTags, ApiQuery, ApiParam, ApiDefaultResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ProductTypeService } from '../service/productType.service';
import { CreateProductTypeDto } from '../dto/create-productType.dto';

@ApiTags("ProductType")
@Controller("productType")
@UseGuards(RolesGuard) 
@UsePipes(new ValidationPipe())
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