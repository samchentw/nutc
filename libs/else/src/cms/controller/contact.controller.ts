import { Controller, Get, Post, Body, Put, Param, Delete, Query, UsePipes, Res, Header, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { RolesGuard, Roles, RoleCheck } from '@app/core/shared';
import { ApiTags, ApiQuery, ApiParam, ApiDefaultResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@app/identity/auth/guard/jwt-auth.guard';
import { ContactService } from '../service';
import { CreateContactDto } from '../dto';
import { UpdateContactDto } from '../dto';



@ApiTags("Contact")
@Controller("contact")
@UsePipes(new ValidationPipe())
export class ContactController {
    constructor(
        private readonly contactService: ContactService,
    ) { }

    @Get("getAll")
    getAll() {
        return this.contactService.getAll();
    }

    @Get("get/:id")
    @ApiParam({ name: "id" })
    get(@Param('id') id) {
        return this.contactService.get(id);
    }

    @Post("")
    create(@Body() input: CreateContactDto) {
        return this.contactService.create(input);
    }

    @Delete(':id')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiParam({ name: 'id' })
    delete(@Param('id') id, @RoleCheck(["admin"]) check) {
        return this.contactService.delete(id);
    }
}