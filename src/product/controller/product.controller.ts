import { Controller, Get, Post, Body, Put, Param, Delete, Query, UsePipes, Res, Header, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { RolesGuard, Roles } from '@app/core/shared';
import { ApiTags, ApiQuery, ApiParam, ApiDefaultResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ProductService } from '../service/product.service';
import { ProductDto, ProductPageDto } from '../dto/product.dto';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.data';

@ApiTags("Product")
@Controller("product")
@UseGuards(RolesGuard)
@UsePipes(new ValidationPipe())
export class ProductController {
  constructor(
    private readonly productService: ProductService,
  ) { }

  @Get("getAll")
  @ApiDefaultResponse({ type: ProductDto, isArray: true })
  getAll() {
    return this.productService.getAll();
  }

  @Get("get/:id")
  @ApiParam({ name: "id" })
  @ApiDefaultResponse({ type: ProductDto })
  get(@Param('id') id) {
    return this.productService.get(id);
  }

  @Post("create")
  @ApiBearerAuth()
  @Roles("admin")
  @ApiDefaultResponse({ type: ProductDto })
  create(@Body() input: CreateProductDto) {
    return this.productService.create(input);
  }

  @Put(':id')
  @ApiBearerAuth()
  @Roles("admin")
  @ApiDefaultResponse({ type: ProductDto })
  @ApiParam({ name: 'id' })
  update(@Param('id') id, @Body() input: UpdateProductDto) {
    return this.productService.update(id, input);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @Roles("admin")
  @ApiParam({ name: 'id' })
  delete(@Param('id') id) {
    return this.productService.delete(id);
  }

  @Get("page")
  @ApiDefaultResponse({ type: ProductPageDto })
  @ApiQuery({ name: "skip", required: false })
  @ApiQuery({ name: "take", required: false })
  @ApiQuery({ name: "productTypeId", required: false })
  @ApiQuery({ name: "showIsSell", required: false })
  async page(@Query() query, @Req() req) {
    // console.log(query)
    var temp = await this.productService.page(
      { skip: query.skip, 
        take: query.take, 
        productTypeId: query.productTypeId, 
        showIsSell: query.showIsSell 
      }, true);
    var result = new ProductPageDto();
    result.count = temp[1];
    result.items = temp[0];
    return result;
  }
}