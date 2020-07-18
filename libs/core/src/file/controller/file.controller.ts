import { Roles, RolesGuard } from '@app/core/shared';
import { JwtAuthGuard } from '@app/identity/auth/guard/jwt-auth.guard';
import {
  Controller, Get, Post, UploadedFiles,
  UseGuards, UseInterceptors
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileService } from '../service/file.service';




@ApiTags('file')
@Controller('file')
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
  @Roles("admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
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
      { name: 'file', maxCount: 20 },
    ]))
  fileUpload(@UploadedFiles() files): Promise<number[]> {
    // console.log(files.file)
    return this.fileService.saveFile(files.file);
  }
}
