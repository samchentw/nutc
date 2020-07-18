import { Roles, RolesGuard } from '@app/core/shared';
import { JwtAuthGuard } from '@app/identity/auth/guard/jwt-auth.guard';
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateProductTypeDto } from '../dto/create-productType.dto';
import { ProductTypeService } from '../service/productType.service';

@ApiTags("ProductType")
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  create(@Body() input: CreateProductTypeDto) {
    return this.productTypeService.create(input);
  }

  @Put(':id')
  @ApiBearerAuth()
  @Roles("admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiParam({ name: 'id' })
  update(@Param('id') id, @Body() input: CreateProductTypeDto) {
    return this.productTypeService.update(id, input);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @Roles("admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiParam({ name: 'id' })
  delete(@Param('id') id) {
    return this.productTypeService.delete(id);
  }
}