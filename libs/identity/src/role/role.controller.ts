import { RoleCheck } from '@app/core/shared';
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiDefaultResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { RoleDto } from './dto';
import { RoleService } from './role.service';

@ApiTags('Role')
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
