import { Controller, Get, Post, Body, Put, Param, Delete, Query, UsePipes, Res, Header, Req, UseGuards } from '@nestjs/common';
import { RolesGuard, Roles, RoleCheck } from '@app/core/shared';
import { ApiTags, ApiQuery, ApiParam, ApiDefaultResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ShopService } from '../service/shop.service';
import { ShopDto, ShopPageDto } from '../dto/shop.dto';
import { CreateShopDto } from '../dto/create-shop.dto';
import { UpdateShopDto } from '../dto/update-shop.data';
import { JwtAuthGuard } from '@app/identity/auth/guard/jwt-auth.guard';

// import { fs } from 'memfs';
@ApiTags("Shop")
@UseGuards(RolesGuard)
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

  @Get("getShopByType/:id")
  @ApiParam({ name: "id" })
  @ApiDefaultResponse({ type: ShopDto, isArray: true })
  async getAllByType(@Param('id') id) {
    var temp = await this.ShopService.getShopByType(id);
    var result = new ShopPageDto();
    result.count = temp.length;
    result.items = temp;
    return result;
  }

  @Post("create")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiDefaultResponse({ type: ShopDto })
  create(@Body() input: CreateShopDto, @RoleCheck(["admin"]) check) {
    return this.ShopService.create(input);
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiDefaultResponse({ type: ShopDto })
  @ApiParam({ name: 'id' })
  update(@Param('id') id, @Body() input: UpdateShopDto, @RoleCheck(["admin"]) check) {
    return this.ShopService.update(id, input);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id' })
  delete(@Param('id') id, @RoleCheck(["admin"]) check) {
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