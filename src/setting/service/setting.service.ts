import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { BaseService } from '../../shared';
import { SettingEntity } from '../entity/setting.entity';
import { CreateSettingDto } from '../dto/create-setting.dto';
import { UpdateSettingDto } from '../dto/update-setting.dto';
import { PostGetKeysDto } from '../dto/post-getKeys.dto';

@Injectable()
export class SettingService extends BaseService<SettingEntity, CreateSettingDto, UpdateSettingDto> {
    constructor(
        @InjectRepository(SettingEntity)
        public repository: Repository<SettingEntity>,
    ) {
        super(repository)
    }

    async getByKeys(input:PostGetKeysDto){
        var result:SettingEntity[]=[];
        for(var i = 0 ;i <input.key.length;i++){
            result.push(await this.repository.findOne({key:input.key[i]}));
        }
        return await result;
    }

    async setByKey(key: string, input: UpdateSettingDto) {
        var find = await this.getBykey( key );
        var result = this.updateData(find, input);
        return this.repository.save(result);
    }

    async getBykey(key:string){ 
        return await this.repository.findOne({key});
    }

    private updateData(value: SettingEntity, newValue: Partial<SettingEntity>): SettingEntity {
        return { ...value, ...newValue }
    }
}
