import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { BaseService } from '@app/core/shared';
import { Setting } from '../entity/setting.entity';
import { CreateSettingDto } from '../dto/create-setting.dto';
import { UpdateSettingDto } from '../dto/update-setting.dto';
import { PostGetKeysDto } from '../dto/post-getKeys.dto';
import * as fs from 'fs'
import * as _ from 'lodash';

@Injectable()
export class SettingService extends BaseService<Setting, CreateSettingDto, UpdateSettingDto> {
    constructor(
        @InjectRepository(Setting)
        public repository: Repository<Setting>,
    ) {
        super(repository)
    }

    async getByKeys(input: PostGetKeysDto) {
        var result: Setting[] = [];
        for (var i = 0; i < input.key.length; i++) {
            result.push(await this.repository.findOne({ key: input.key[i] }));
        }
        return await result;
    }

    async setByKey(input: UpdateSettingDto) {
        var find = await this.getBykey(input.key);
        var result = this.updateData(find, input);
        return this.repository.save(result);
    }

    async setBykeys(input: UpdateSettingDto[]) {
        var result = [];
        for (var i = 0; i < input.length; i++) {
            var data = await this.setByKey(input[i]);
            result.push(data);
        }
        return result;
    }

    async getBykey(key: string) {
        return await this.repository.findOne({ key });
    }

    private updateData(value: Setting, newValue: Partial<Setting>): Setting {
        return { ...value, ...newValue }
    }

    // seed
    async seed() {
        var settings = await this.repository.find();
        let data: Setting[] = JSON.parse(fs.readFileSync(process.cwd() + "/seeds/settings.json", "utf8"));
        settings = _.differenceBy(settings, data, "key");
        // console.log(data);
        // console.log(settings)
        settings.forEach(async x => {
            await this.repository.delete(x.id);
        });

        for (var i = 0; i < data.length; i++) {
            var find = await this.repository.findOne({ key: data[i].key });
            // console.log(find)
            if (find == null) {
                await this.repository.save(data[i]);
            }
        }
    }
}
