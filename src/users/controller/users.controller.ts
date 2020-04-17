import { Controller, Get, UsePipes, UseGuards, Post, Body,Param, Put, Delete, Query, Req } from '@nestjs/common';
import { UpdateUserPwd, CreateUserDto, LoginUserDto, UpdateUserInfoDto, User } from '../dto';
import { UsersService } from '../service/users.service';
import {ValidationPipe,UnauthorizedException,RolesGuard,Roles} from '../../shared';
import {ApiTags, ApiBearerAuth,ApiDefaultResponse,ApiBody} from '@nestjs/swagger';

@ApiTags('Users')
@UseGuards(RolesGuard) 
@Controller('users')
export class UserController {
      constructor(
        private readonly userService:UsersService
      ){} 
      
      @Post('register')
      @UsePipes(new ValidationPipe())
      create(@Body() body:CreateUserDto){             
          return   this.userService.register(body);                                   
      }

      @ApiBearerAuth()
      @Get('info')
      @ApiDefaultResponse({type:User.UserDto})      
      async userInfo(@Req() req){
        console.log(req.user)
        return await this.userService.get(req.user.id);
      }

      @ApiBearerAuth()
      @Put('info') 
      @UsePipes(new ValidationPipe())     
      async update(@Req() req,@Body() body:UpdateUserInfoDto){
        return await this.userService.update(req.user.id,body);        
      }

      @ApiBearerAuth()
      @Put('password')
      @UsePipes(new ValidationPipe())
      async updatePwd(@Req() req,@Body() body:UpdateUserPwd){
        const check=await this.userService.userPwdcheck(req.user.id,body);        
        if(check) return await this.userService.updatePwd(req.user.id,body);
        else throw new UnauthorizedException();
      }

     

      @ApiBearerAuth()
      @Roles("admin")
      @Get("admin/getAllUser")
      async getAllUser(){
        return await this.userService.getAllUser();
      }

}
