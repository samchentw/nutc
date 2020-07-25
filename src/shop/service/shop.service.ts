import { FileService } from '@app/core/file/service/file.service';
import { BaseService, ExcelService } from '@app/core/shared';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { CreateShopDto } from '../dto/create-shop.dto';
import { UpdateShopDto } from '../dto/update-shop.data';
import { Shop } from '../entity/shop.entity';
import { ShopTypeEnum } from '../enum/enum';
import * as _ from 'lodash';
@Injectable()
export class ShopService extends BaseService<Shop, CreateShopDto, UpdateShopDto> {

    constructor(
        @InjectRepository(Shop)
        public repository: Repository<Shop>,
        @Inject('ExcelFactory') private ExcelService: ExcelService,
        private readonly fileService: FileService,
    ) {
        super(repository)
    }

    async create(input: CreateShopDto) {
        let shop = plainToClass(Shop, input);
        shop.shopImage = await this.fileService.getFileUrlAndIdStr(input.imageIds);
        shop.isDelete = false;
        return await super.create(shop)
    }

    async update(id: number, input: UpdateShopDto) {
        let newshop = plainToClass(Shop, input, { excludeExtraneousValues: true });
        if (input.imageIds && input.imageIds.length > 0) {
            newshop.shopImage = await this.fileService.getFileUrlAndIdStr(input.imageIds);
        } else {
            newshop.shopImage = "[]";
        }
        return await super.update(id, newshop)
    }

    async getShopByType(ShopTypeEnum: ShopTypeEnum) {
        return await this.repository.find({ shopType: ShopTypeEnum });
    }

    // async readRoad() {  
    //     let datas = this.ExcelService.ReadExcel<RoadData>("./seeds/opendata108road.xlsx", 0);
    //     let group: _.Dictionary<RoadData[]> = _.groupBy(datas, x => x.縣市名稱);
    //     let city = _.uniqBy(datas.map(x => x.縣市名稱), x => x);
    //     for (let i = 0; i < datas.length; i++) {

    //     }
    // }

    async readExcel() {
        let datas = this.ExcelService.ReadExcel<shopData>("./seeds/店家.xlsx", 0);

        for (let i = 0; i < datas.length; i++) {
            let check = await this.repository.findOne({ name: datas[i].店家名稱 });
            if (!check) {
                let shop = new Shop();
                shop.name = datas[i].店家名稱;
                shop.phone = datas[i].電話;
                shop.address = datas[i].地址;
                if (datas[i].備註) shop.remark = datas[i].備註
                else shop.remark = "";
                shop.description = "";
                shop.isDelete = false;
                shop.shopImage = "[]";
                if (datas[i].種類 == 0) {
                    shop.shopType = ShopTypeEnum.一般商店;
                } else {
                    shop.shopType = ShopTypeEnum.美食商店;
                }
                await this.repository.save(shop);
            }
        }
        console.log("匯入成功！");
    }


}

export class shopData {
    店家名稱: string;
    地址: string;
    電話: string;
    備註: string;
    種類: number;
}

export class RoadData {
    縣市名稱: string;
    行政區域名稱: string;
    路名: string;
}