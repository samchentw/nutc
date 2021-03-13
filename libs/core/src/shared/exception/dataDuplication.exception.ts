import {HttpException,HttpStatus} from '@nestjs/common';

export class DataDuplicationException extends HttpException {
    constructor() {
      super('Input data validation failed', HttpStatus.BAD_REQUEST);
    }
  }