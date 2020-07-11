import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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