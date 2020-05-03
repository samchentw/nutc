import { Injectable, Inject } from '@nestjs/common';

import { InjectRepository, } from '@nestjs/typeorm';
import { Repository, Entity } from 'typeorm';
import * as _ from 'lodash';
import { ExcelService, BaseService, PageDto } from '@app/core/shared';
import { FileService } from '@app/core/file/service/file.service';
import { plainToClass, classToPlain, classToClass, plainToClassFromExist } from 'class-transformer';
import { OrderDetailEntity } from '../entity/orderDetail.entity';
@Injectable()
export class OrderDetailService {
    constructor(
        @InjectRepository(OrderDetailEntity)
        public repository: Repository<OrderDetailEntity>,
    ) { }

    
}