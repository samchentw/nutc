import { Roles, RolesGuard } from '@app/core/shared';
import { JwtAuthGuard } from '@app/identity/auth/guard/jwt-auth.guard';
import {
  Controller, Get, Post, UploadedFiles,
  UseGuards, UseInterceptors
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags, ApiOperation } from '@nestjs/swagger';
import { FileService } from '../service/file.service';

@ApiTags('file(檔案)')
@Controller('file')
export class FileController {

  constructor(
    private fileService: FileService
  ) {

  }

  @Get("getAll")
  @ApiOperation({ summary: "取得所有檔案資料" })
  getAll() {
    return this.fileService.findAll();
  }

  @Get("getPublicFiles")
  @ApiOperation({ summary: "取得資料夾下所有檔案名稱" })
  getPublicFiles() {
    return this.fileService.readPublicFiles();
  }


  @Post('upload')
  @Roles("admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "上傳多個檔案(上限20筆)" })
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
