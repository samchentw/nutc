import { Roles, RolesGuard } from '@app/core/shared';
import { JwtAuthGuard } from '@app/identity/auth/guard/jwt-auth.guard';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Roles("admin", "user")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  getHello(): string {
    return this.appService.getHello();
  }
}
