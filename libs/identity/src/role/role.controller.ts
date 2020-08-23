import { Roles, RolesGuard } from '@app/core/shared';
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiDefaultResponse, ApiParam, ApiTags, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { RoleDto } from './dto';
import { RoleService } from './role.service';

@ApiTags('Roles(角色)')
@Controller('role')
export class RoleController {
    constructor(
        private readonly roleService: RoleService
    ) { }

    @Get('getAll')
    @ApiOperation({ summary: "取得所有角色" })
    @ApiDefaultResponse({ type: RoleDto, isArray: true })
    getAll() {
        return this.roleService.getAll();
    }

    @ApiBearerAuth()
    @Roles("admin")
    @ApiOperation({ summary: "新增角色" })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('create')
    create(@Body() body: RoleDto) {
        return this.roleService.create(body);
    }

    @ApiBearerAuth()
    @Roles("admin")
    @ApiOperation({ summary: "修改角色" })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':id')
    @ApiParam({ name: 'id' })
    update(@Param('id') id: number, @Body() body: RoleDto) {
        return this.roleService.update(id, body);
    }

    @ApiBearerAuth()
    @Roles("admin")
    @ApiOperation({ summary: "刪除角色" })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id')
    @ApiParam({ name: 'id' })
    delete(@Param('id') id: number) {
        return this.roleService.delete(id);
    }

    @Get("seed")
    @ApiOperation({ summary: "匯入資料" })
    seed() {
        this.roleService.seed();
    }
}
