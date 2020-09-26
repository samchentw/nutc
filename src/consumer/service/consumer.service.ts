import { CreateUserDto } from '@app/identity/users/dto';
import { UsersService } from '@app/identity/users/service/users.service';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Consumer } from '../entity/consumer.entity';
import { NewsService } from '@app/cms/news/service/news.service'
import { News } from '@app/cms/news/dto/news/news.dto';
import { classToPlain, plainToClass } from 'class-transformer';
import { ConsumerNewsDto } from '../dto/consumer-news.dto';
import { NewsTypeService } from '@app/cms/news/service/newsType.service';
@Injectable()
export class ConsumerService {

    constructor(
        @InjectRepository(Consumer)
        public repository: Repository<Consumer>,
        private readonly usersService: UsersService,
        private readonly newsService: NewsService,
        private readonly newsTypeService:NewsTypeService,
    ) {

    }

    async register(input: CreateUserDto) {
        let user = await this.usersService.register(input);
        let consumer = new Consumer();
        consumer.order = [];
        consumer.newsJson = [];
        consumer.userId = user.id;
        return await this.repository.save(consumer);
    }

    async addorUpdateNews(userId: string, newsId: number, isComplete: boolean) {
        let consumer = await this.getByUserId(userId);

        let check = consumer.newsJson.findIndex(x => x.newsId == newsId);

        if (check == -1) {
            consumer.newsJson.push({
                newsId, isComplete
            });
        } else {
            consumer.newsJson[check].isComplete = isComplete;
        }

        // console.log(consumer)
        return await this.repository.save(consumer);
    }

    async removeNews(userId: string, newsId: number) {
        let consumer = await this.getByUserId(userId);
        consumer.newsJson = consumer.newsJson.filter(x => x.newsId != newsId);
        return await this.repository.save(consumer);
    }

    async getByUserId(userId: string) {
        let consumer = await this.repository.findOne({ userId: userId });
        if (consumer) return consumer
        else throw new InternalServerErrorException(null, "找不到此消費者！")
    }


    async getConsumerWithDetil(userId: string) {
        let consumer = await this.getByUserId(userId);
        let news: ConsumerNewsDto[] = [];

        for (let item of consumer.newsJson) {
            let newItem = await this.newsService.get(item.newsId);
            let dto = plainToClass(News.NewsDto, newItem, { excludeExtraneousValues: true });
            let temp: ConsumerNewsDto;
            temp = dto as ConsumerNewsDto;
            temp.newsTypeName = newItem.newsType.name;
            temp.isComplete = item.isComplete;
            news.push(temp);
        }
        let result = classToPlain(news)
        return result;
    }
}