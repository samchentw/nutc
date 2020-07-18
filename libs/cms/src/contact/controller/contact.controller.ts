import { Roles, RolesGuard } from '@app/core/shared';
import { JwtAuthGuard } from '@app/identity/auth/guard/jwt-auth.guard';
import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateContactDto } from '../dto/create-contact.dto';
import { ContactService } from '../service/contact.service';



@ApiTags("Contact")
@Controller("contact")
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
    @Roles("admin")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiParam({ name: 'id' })
    delete(@Param('id') id) {
        return this.contactService.delete(id);
    }
}
