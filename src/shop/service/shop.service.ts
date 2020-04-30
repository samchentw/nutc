import { Injectable, Inject } from '@nestjs/common';

import { InjectRepository, } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as _ from 'lodash';
import { ExcelService, BaseService } from '@app/core/shared';
import { CreateShopDto } from '../dto/create-shop.dto';
import { UpdateShopDto } from '../dto/update-shop.data';
import { ShopEntity } from '../entity/shop.entity';
@Injectable()
export class ShopService extends BaseService<ShopEntity, CreateShopDto, UpdateShopDto> {

    constructor(
        @InjectRepository(ShopEntity)
        public repository: Repository<ShopEntity>,
        @Inject('ExcelFactory') private ExcelService: ExcelService,
    ) {
        super(repository)
        // this.readExcel();
    }

    readExcel() {
        var datas = this.ExcelService.ReadExcel<shopData>("./seeds/店家", 0);
        datas.forEach(data => {
            var check = this.repository.findOne({name:data.店家名稱});
            if(!check){
                var shop = new ShopEntity();
                shop.name = data.店家名稱;
                shop.phone = data.電話;
                if (data.備註) shop.remark = data.備註
                else shop.remark = "";
                shop.description = "";
                shop.delete = false;
                this.repository.save(shop);
            }
        });
        console.log("匯入成功！");
    }


}

export class shopData {
    店家名稱: string;
    地址: string;
    電話: string;
    備註: string;
}