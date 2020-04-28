import { Controller, Post, UsePipes, Body, UseGuards, Get } from '@nestjs/common';
import {ApiTags, ApiBearerAuth,ApiDefaultResponse,ApiBody} from '@nestjs/swagger';
import { LoginUserDto, User } from '../../users/dto';
import {ValidationPipe,UnauthorizedException,RolesGuard,Roles} from '../../shared';
import { UsersService } from '../../users/service/users.service';
import { AuthService } from '../service';
@ApiTags('Auth')
@UseGuards(RolesGuard) 
@Controller('auth')
export class AuthController {
    constructor(
        private usersService:UsersService,
        private authService:AuthService
    ) {}
    
    @Post('login')
    @ApiBody({type:LoginUserDto})
    @ApiDefaultResponse({type:User.TokenDto})
    @UsePipes(new ValidationPipe())
    async login(@Body() body:LoginUserDto){
      const user=await this.usersService.checkUser(body);
      if(user) return await this.authService.createToken(user.id,user.userinfo.id);
      else   throw new UnauthorizedException();
    }


    @Roles("admin")
    @ApiBearerAuth()
    @Get('admin/permission')
    // @ApiBody({type:LoginUserDto})
    // @ApiDefaultResponse({type:User.TokenDto})
    @UsePipes(new ValidationPipe())
    async admin(){
      return true;
    }
}
