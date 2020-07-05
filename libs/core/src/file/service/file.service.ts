import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Repository, UpdateResult, InsertResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SaveFileService } from '@app/core/shared';
import { File } from '../entity/file.entity';
import { extname } from 'path';
import * as fs from 'fs';

export class ImageIdAndUrlDto {
    id: number;
    url: string;
}

@Injectable()
export class FileService {
    constructor(
        @Inject('SaveFileFactory') private saveFileService: SaveFileService,
        @InjectRepository(File)
        private readonly FileRepository: Repository<File>,
        private readonly configService: ConfigService
    ) { }

    async readPublicFiles(): Promise<String[]> {
        let savepath = this.configService.get<string>('saveFilePath');
        let files = await fs.readdirSync(process.cwd() + savepath)
        return files;
    }

    saveFile(files: any[]) {
        let savepath = this.configService.get<string>('saveFilePath');
        let path = process.cwd() + savepath;
        files.forEach(file => {
            const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
            file.displayName = randomName + extname(file.originalname);
        });
        this.saveFileService.saveFiles(path, files);
        return this.saveDb(files);
    }

    async saveDb(files: any[]): Promise<number[]> {
        let result: number[] = [];
        for (let i = 0; i < files.length; i++) {
            let temp = await this.FileRepository.save({
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
        let file = await this.findByIds(ids);
        let result = file.map(x => {
            return {
                id: x.id,
                url: x.url
            }
        });
        return JSON.stringify(result);
    }

    async getFileUrlAndId(ids: number[]): Promise<ImageIdAndUrlDto[]> {
        let file = await this.findByIds(ids);
        let result: ImageIdAndUrlDto[] = file.map(x => {
            return {
                id: x.id,
                url: x.url
            }
        });
        return result
    }

    findAll() {
        return this.FileRepository.find();
    }
}
