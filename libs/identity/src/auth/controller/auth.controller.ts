import { Roles, RolesGuard } from '@app/core/shared';
import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiProperty, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { LocalAuthGuard } from '../guard/local-auth.guard';
import { AuthService } from '../service/auth.service';
import { LoginDto } from '../dto/log.dto';


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) { }

  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginDto })
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  // @UseGuards(JwtAuthGuard)
  // @Get('profile')
  // @ApiBearerAuth()
  // getProfile(@Request() req) {
  //   return req.user;
  // }

  @ApiBearerAuth()
  @Roles("admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('admin/permission')
  async admin() {
    return true;
  }
}
