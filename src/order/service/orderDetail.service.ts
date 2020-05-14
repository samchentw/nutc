import { Injectable, Inject } from '@nestjs/common';

import { InjectRepository, } from '@nestjs/typeorm';
import { Repository, Entity } from 'typeorm';
import * as _ from 'lodash';
import { ExcelService, BaseService, PageDto } from '@app/core/shared';
import { FileService } from '@app/core/file/service/file.service';
import { plainToClass, classToPlain, classToClass, plainToClassFromExist } from 'class-transformer';
import { OrderDetail } from '../entity/orderDetail.entity';
@Injectable()
export class OrderDetailService {
    constructor(
        @InjectRepository(OrderDetail)
        public repository: Repository<OrderDetail>,
    ) { }

    async save(input:OrderDetail){
        return await this.repository.save(input);
    }
    
}