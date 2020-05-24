import {
  Controller, Get, Post, Param, UseInterceptors, UploadedFiles, Request, Res
  , Req, UploadedFile, Delete, Query, UseGuards
} from '@nestjs/common';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';

import { ApiTags, ApiBearerAuth, ApiParam, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { dataDuplicationException, RolesGuard, Roles, RoleCheck } from '@app/core/shared';
import { FileService } from '../service/file.service';
import { JwtAuthGuard } from '@app/identity/auth/guard/jwt-auth.guard';



@ApiTags('File')
@Controller('File')
export class FileController {

  constructor(
    private fileService: FileService
  ) {

  }

  @Get("getAll")
  getAll() {
    return this.fileService.findAll();
  }

  @Get("getPublicFiles")
  getPublicFiles() {
    return this.fileService.readPublicFiles();
  }


  @Post('upload')
  @UseGuards(JwtAuthGuard)
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
  async fileUpload(@UploadedFiles() files, @RoleCheck(["admin"]) admin) {
    return this.fileService.saveFile(files.file);
  }
}
