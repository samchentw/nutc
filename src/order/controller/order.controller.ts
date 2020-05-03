import { Controller, Get, Post, Body, Put, Param, Delete, Query, UsePipes, Res, Header, Req, UseGuards } from '@nestjs/common';
import { ValidationPipe, RolesGuard, Roles } from '@app/core/shared';
import { ApiTags, ApiQuery, ApiParam, ApiDefaultResponse, ApiBearerAuth } from '@nestjs/swagger';
// import { fs } from 'memfs';
@ApiTags("Order")
@UseGuards(RolesGuard) 
@Controller("order")
export class OrderController {
  constructor(
  ) { }
}