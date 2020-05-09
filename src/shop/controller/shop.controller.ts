import { Controller, Get, Post, Body, Put, Param, Delete, Query, UsePipes, Res, Header, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { RolesGuard, Roles } from '@app/core/shared';
import { ApiTags, ApiQuery, ApiParam, ApiDefaultResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ShopService } from '../service/shop.service';
import { ShopDto, ShopPageDto } from '../dto/shop.dto';
import { CreateShopDto } from '../dto/create-shop.dto';
import { UpdateShopDto } from '../dto/update-shop.data';

// import { fs } from 'memfs';
@ApiTags("Shop")
@UseGuards(RolesGuard)
@UsePipes(new ValidationPipe()) 
@Controller("shop")
export class ShopController {
  constructor(
    private readonly ShopService: ShopService,
  ) { }

  @Get("getAll")
  @ApiDefaultResponse({ type: ShopDto, isArray: true })
  getAll() {
    return this.ShopService.getAll();
  }

  @Get("get/:id")
  @ApiParam({ name: "id" })
  @ApiDefaultResponse({ type: ShopDto })
  get(@Param('id') id) {
    return this.ShopService.get(id);
  }

  @Post("create") 
  @ApiBearerAuth()
  @Roles("admin")
  // @UsePipes(new ValidationPipe())
  @ApiDefaultResponse({ type: ShopDto })
  create(@Body() input: CreateShopDto) {
    return this.ShopService.create(input);
  }

  @Put(':id')
  @ApiBearerAuth()
  @Roles("admin")
  @ApiDefaultResponse({ type: ShopDto })
  @ApiParam({ name: 'id' })
  update(@Param('id') id, @Body() input: UpdateShopDto) {
    return this.ShopService.update(id, input);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @Roles("admin")
  @ApiParam({ name: 'id' })
  delete(@Param('id') id) {
    return this.ShopService.delete(id);
  }

  @Get("page")
  @ApiDefaultResponse({ type: ShopPageDto })
  @ApiQuery({ name: "skip", required: false })
  @ApiQuery({ name: "take", required: false })
  async page(@Query() query, @Req() req) {
    var temp = await this.ShopService.page({ skip: query.skip, take: query.take }, true);
    var result = new ShopPageDto();
    result.count = temp[1];
    result.items = temp[0];
    return result;
  }


  @Get("seed")
  seed() {
    this.ShopService.readExcel();
  }
}