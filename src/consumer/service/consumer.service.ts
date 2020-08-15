import { Injectable, Inject } from '@nestjs/common';

import { InjectRepository, } from '@nestjs/typeorm';
import { Repository, Entity } from 'typeorm';
import * as _ from 'lodash';
import { ExcelService, BaseService, PageDto } from '@app/core/shared';
import { FileService } from '@app/core/file/service/file.service';
import { plainToClass, classToPlain, classToClass, plainToClassFromExist } from 'class-transformer';
import { Consumer } from '../entity/consumer.entity';
import { UsersService } from '@app/identity/users/service/users.service';
import { CreateUserDto } from '@app/identity/users/dto';


@Injectable()
export class ConsumerService {

    constructor(
        @InjectRepository(Consumer)
        public repository: Repository<Consumer>,
        private readonly usersService: UsersService
    ) {

    }

    async register(input: CreateUserDto) {
        var user = await this.usersService.register(input);
        var consumer = new Consumer();
        consumer.order = [];
        // consumer.point = 0;
        consumer.userId = user.id;
        return await this.repository.save(consumer);
    }

    getByUserId(userId: string) {
        return this.repository.findOne({ userId });
    }
}