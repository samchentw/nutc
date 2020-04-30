import { Controller, Get, UsePipes, UseGuards, Post, Body,Param, Put, Delete, Query, Req } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleDto } from './dto';
import {ApiTags, ApiBearerAuth, ApiParam, ApiDefaultResponse} from '@nestjs/swagger';
import {RolesGuard,Roles} from '@app/core/shared';

@ApiTags('Role')
@UseGuards(RolesGuard)
@Controller('role')
export class RoleController {
    constructor(
        private readonly roleService:RoleService
    ){}
    
    @Get('getAll')
    @ApiDefaultResponse({type:RoleDto,isArray:true})
    getAll(){
        return this.roleService.getAll();
    }

    @ApiBearerAuth()
    @Roles("admin")
    @Post('create')
    create(@Body() body:RoleDto){
        return this.roleService.create(body);
    }

    @ApiBearerAuth()
    @Roles("admin")
    @Put(':id')
    @ApiParam({name:'id'})
    update(@Param('id') id:number,@Body() body:RoleDto){
        return this.roleService.update(id,body);
    }

    @ApiBearerAuth()
    @Roles("admin")
    @Delete(':id')
    @ApiParam({name:'id'})
    delete(@Param('id') id:number){
        return this.roleService.delete(id);
    }

    @Get("seed")
    seed(){
        this.roleService.seed();
    }
}
