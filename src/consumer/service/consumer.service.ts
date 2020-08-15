import { CreateUserDto } from '@app/identity/users/dto';
import { UsersService } from '@app/identity/users/service/users.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Consumer } from '../entity/consumer.entity';



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