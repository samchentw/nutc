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
import * as _ from 'lodash';
import { customizedException } from '@app/core/shared';
import * as moment from 'moment';
@Injectable()
export class ConsumerService {
    readonly time: number[] = [9, 12, 15, 18, 21];
    constructor(
        @InjectRepository(Consumer)
        public repository: Repository<Consumer>,
        private readonly usersService: UsersService,
        private readonly newsService: NewsService,
        private readonly newsTypeService: NewsTypeService,
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

    private searchDay(newsJson: any[], searchDay: number): number[] {
        let or_date = newsJson
            .filter(x => new Date(x.time).getDate() == searchDay)
            .map(x => new Date(x.time).getHours());
        return _.xorWith(or_date, this.time);
    }

    async addorUpdateNews(userId: string, newsId: number,
        isComplete: boolean, newsDetailId: string, date: Date) {
        let consumer = await this.getByUserId(userId);
        let newDate: any = new Date(date)
        let xorwith = this.searchDay(consumer.newsJson, newDate.getDate())

        if (xorwith.length == 0) {
            xorwith = this.searchDay(consumer.newsJson, newDate.getDate() + 1)
            newDate.setDate(newDate.getDate() + 1);
            if (xorwith.length == 0) throw new customizedException("您的行程已滿！", 403)
        };
        newDate.setHours(_.first(xorwith), 0);

        let check = consumer.newsJson.findIndex(x => x.newsDetailId == newsDetailId);
        if (check == -1) {
            consumer.newsJson.push({
                newsId, isComplete, newsDetailId, time: newDate.toLocaleString()
            });
        } else {
            consumer.newsJson[check].isComplete = isComplete;
        }
        return await this.repository.save(consumer);
    }

    async removeNewsDetail(userId: string, newsDetailId: string) {
        let consumer = await this.getByUserId(userId);
        consumer.newsJson = consumer.newsJson.filter(x => x.newsDetailId != newsDetailId);
        return await this.repository.save(consumer);
    }

    async getByUserId(userId: string) {
        let consumer = await this.repository.findOne({ userId: userId });
        if (consumer) return consumer
        else throw new InternalServerErrorException(null, "找不到此消費者！")
    }


    async getConsumerWithDetil(userId: string) {
        let consumer = await this.getByUserId(userId);
        const monthName = item => moment(item.time, 'YYYY-MM-DD').format('YYYY-MM-DD');
        let check = _(consumer.newsJson)
        .groupBy(monthName)
        // .mapValues(items => _.map(items, 'newsDetailId'))
        .value()
        console.log(check)
        return check;
    }


    async getConsumerWithDetilByOneNews(userId: string, newId: number) {
        let consumer = await this.getByUserId(userId);
        let result = consumer.newsJson.filter(x => x.newsId == newId);
        return result;
    }
}