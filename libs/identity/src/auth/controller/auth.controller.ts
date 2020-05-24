import { Controller, Post, Get, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiDefaultResponse, ApiBody, ApiProperty } from '@nestjs/swagger';
import { LoginUserDto, User } from '../../users/dto';
import { UsersService } from '../../users/service/users.service';
import { AuthService } from '../service/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from '../guard/local-auth.guard';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { RoleCheck } from '@app/core/shared';

export class logDto {
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
}
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) { }

  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: logDto })
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
  @UseGuards(JwtAuthGuard)
  @Get('admin/permission')
  async admin(@RoleCheck(["admin"]) check) {
    return true;
  }
}
