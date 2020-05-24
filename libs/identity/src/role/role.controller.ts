import { Controller, Get, UsePipes, UseGuards, Post, Body, Param, Put, Delete, Query, Req, ValidationPipe } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleDto } from './dto';
import { ApiTags, ApiBearerAuth, ApiParam, ApiDefaultResponse } from '@nestjs/swagger';
import { RolesGuard, Roles, RoleCheck } from '@app/core/shared';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@ApiTags('Role')
@UsePipes(new ValidationPipe())
@Controller('role')
export class RoleController {
    constructor(
        private readonly roleService: RoleService
    ) { }

    @Get('getAll')
    @ApiDefaultResponse({ type: RoleDto, isArray: true })
    getAll() {
        return this.roleService.getAll();
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post('create')
    create(@Body() body: RoleDto, @RoleCheck(["admin"]) admin) {
        return this.roleService.create(body);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Put(':id')
    @ApiParam({ name: 'id' })
    update(@Param('id') id: number, @Body() body: RoleDto, @RoleCheck(["admin"]) check) {
        return this.roleService.update(id, body);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @ApiParam({ name: 'id' })
    delete(@Param('id') id: number, @RoleCheck(["admin"]) check) {
        return this.roleService.delete(id);
    }

    @Get("seed")
    seed() {
        this.roleService.seed();
    }
}
