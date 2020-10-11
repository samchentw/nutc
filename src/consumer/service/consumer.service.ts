import { NewsService } from '@app/cms/news/service/news.service';
import { customizedException } from '@app/core/shared';
import { CreateUserDto } from '@app/identity/users/dto';
import { UsersService } from '@app/identity/users/service/users.service';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as _ from 'lodash';
import * as moment from 'moment';
import { Repository } from 'typeorm';
import { Consumer } from '../entity/consumer.entity';
@Injectable()
export class ConsumerService {
    readonly time: number[] = [9, 12, 15, 18, 21];
    constructor(
        @InjectRepository(Consumer)
        public repository: Repository<Consumer>,
        private readonly usersService: UsersService,
        private readonly newsService: NewsService
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


        consumer.newsJson.push({
            newsId, isComplete, newsDetailId, time: newDate.toLocaleString()
        });
        return await this.repository.save(consumer);
    }

    async removeNewsDetail(userId: string, newsDetailId: string, dateStr: string) {
        const dateFormat = "YYYY-MM-DD";
        const dateFormatFun = item => moment(item, dateFormat).format(dateFormat);

        let date = new Date(dateStr);
        let ano_Date = new Date(dateStr);
        ano_Date.setDate(ano_Date.getDate() + 1);

        let consumer = await this.getByUserId(userId);
        
        consumer.newsJson = consumer.newsJson.filter(x =>
            (x.newsDetailId != newsDetailId)
            && ((dateFormatFun(x.time) == dateFormatFun(date)) || (dateFormatFun(x.time) == dateFormatFun(ano_Date))) );
       
            return await this.repository.save(consumer);
    }

    async getByUserId(userId: string) {
        let consumer = await this.repository.findOne({ userId: userId });
        if (consumer) return consumer
        else throw new InternalServerErrorException(null, "找不到此消費者！")
    }


    async getConsumerWithDetil(userId: string, date: Date) {
        const dateFormat = "YYYY-MM-DD";
        const today = new Date(Date.now()).toLocaleString();
        console.log(today)
        const monthName = item => moment(item.time, dateFormat).format(dateFormat);

        let consumer = await this.getByUserId(userId);
        let dateStr = moment(date, dateFormat).format(dateFormat)
        let ano_date = new Date(date);
        ano_date.setDate(ano_date.getDate() + 1)
        let dateStr_ano = moment(ano_date, dateFormat).format(dateFormat)

        let queryData = consumer.newsJson
            .filter(x => (monthName(x) == dateStr) || (monthName(x) == dateStr_ano));

        let result = _.groupBy(queryData, monthName);
        let keys =_.orderBy(Object.keys(result),x=>x,"asc") ;
        if(keys.length > 0 && keys[0] != dateStr) return {};
        for (let key of keys) {
            
            let times = result[key].map(x => new Date(x.time).getHours())
            let xorwith = _.xorWith(times, this.time);
            for (let item of result[key]) {
                let news = await this.newsService.get(item.newsId);
                let detail = news.newsDetails.find(x => x.id == item.newsDetailId);
                item.displayName = detail.subtitle;
                if(new Date(item.time )< new Date(today)) item.isExpired = true;
            }
            for (let item of xorwith) {
                let input = new Date(key);
                input.setHours(item, 0);
                result[key].push({
                    time: input.toLocaleString(),
                    displayName: "尚未安排行程"
                })
            }
            result[key].sort((a, b) => {
                var dateA = new Date(a.time);
                var dateB = new Date(b.time);
                return dateA.getTime() - dateB.getTime();
            });
        }
        return result;
    }


    async getConsumerWithDetilByOneNews(userId: string, newId: number, dateStr: string) {
        const dateFormat = "YYYY-MM-DD";
        const dateFormatFun = item => moment(item, dateFormat).format(dateFormat);

        let date = new Date(dateStr);
        let ano_Date = new Date(dateStr);
        ano_Date.setDate(ano_Date.getDate() + 1);

        let consumer = await this.getByUserId(userId);
        let result = consumer.newsJson
        .filter(x => (x.newsId == newId) && ((dateFormatFun(x.time) == dateFormatFun(date)) || (dateFormatFun(x.time) == dateFormatFun(ano_Date))));
        return result;
    }

    async updateDate(userId: string, date: Date) {
        let consumer = await this.getByUserId(userId);
        consumer.selectDate = date;
        return this.repository.save(consumer);
    }
}