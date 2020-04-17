import { Controller, Get, Post, Param, UseInterceptors,UploadedFiles,Request, Res
    , Req, UploadedFile, Delete, Query, UseGuards } from '@nestjs/common';
import {FileFieldsInterceptor,FileInterceptor} from '@nestjs/platform-express';

import {ApiTags, ApiBearerAuth, ApiParam, ApiConsumes,ApiBody} from '@nestjs/swagger';
import {dataDuplicationException, RolesGuard, Roles} from '../../shared';
import { FileService } from '../service/file.service';



@ApiTags('File')
@UseGuards(RolesGuard)
@Controller('File')
export class FileController {
  
  constructor(
      private fileService:FileService
  ){    
        
  }

  @Get("getAll")
  getAll(){
    return this.fileService.findAll();
  }


  @Post('upload')
  // @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })       
  @UseInterceptors(
    FileFieldsInterceptor([
    { name: 'file', maxCount: 5 },
    ]))
    async fileUpload( @UploadedFiles() files,@Request() req) {                  
        return this.fileService.saveFile(files.file);        
    }
}
