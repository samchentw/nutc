import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Repository, UpdateResult, InsertResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SaveFileService } from '@app/core/shared';
import { File } from '../entity/file.entity';
import { extname } from 'path';
import * as fs from 'fs';

@Injectable()
export class FileService {
    constructor(
        @Inject('SaveFileFactory') private saveFileService: SaveFileService,
        @InjectRepository(File)
        private readonly FileRepository: Repository<File>,
        private readonly configService: ConfigService
    ) { }

    async readPublicFiles(): Promise<String[]> {
        var savepath = this.configService.get<string>('saveFilePath');
        var files = await fs.readdirSync(process.cwd() + savepath)
        return files;
    }

    saveFile(files: any[]) {
        var savepath = this.configService.get<string>('saveFilePath');
        var path = process.cwd() + savepath;
        files.forEach(file => {
            const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
            file.displayName = randomName + extname(file.originalname);
        });
        this.saveFileService.saveFiles(path, files);
        return this.saveDb(files);
    }

    async saveDb(files: any[]): Promise<number[]> {
        var result: number[] = [];
        for (var i = 0; i < files.length; i++) {
            var temp = await this.FileRepository.save({
                filename: files[i].fieldname,
                originalname: files[i].originalname,
                isDelete: false,
                mimetype: files[i].mimetype,
                size: files[i].encoding,
                url: "/" + files[i].displayName
            });
            result.push(temp.id)
        }
        return result;
    }

    findByIds(ids: number[]): Promise<File[]> {
        return this.FileRepository.findByIds(ids);
    }

    async getFileUrlAndIdStr(ids: number[]): Promise<string> {
        var file = await this.findByIds(ids);
        var result = file.map(x => {
            return {
                id: x.id,
                url: x.url
            }
        });
        return JSON.stringify(result);
    }

    findAll() {
        return this.FileRepository.find();
    }
}
