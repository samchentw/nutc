import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { BaseService } from '../../shared';
import { SettingEntity } from '../entity/setting.entity';
import { CreateSettingDto } from '../dto/create-setting.dto';
@Injectable()
export class SettingService extends BaseService<SettingEntity,CreateSettingDto,CreateSettingDto> {
    constructor(
        @InjectRepository(SettingEntity)
        public repository: Repository<SettingEntity>,
    ){
        super(repository)
    }    
}
