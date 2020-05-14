import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Repository, UpdateResult, InsertResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SaveFileService } from '@app/core/shared';
import { File } from '../entity/file.entity';
import { extname } from 'path';


@Injectable()
export class FileService {
    constructor(
        @Inject('SaveFileFactory') private saveFileService: SaveFileService,
        @InjectRepository(File)
        private readonly FileRepository: Repository<File>,
        private readonly configService: ConfigService
    ) { }

    saveFile(files: any[]) {
        var savepath = this.configService.get<string>('saveFilePath');
        var path = process.cwd() + savepath;
        files.forEach(file => {
            const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
            file.displayName = randomName + extname(file.originalname);
        });
        this.saveFileService.saveFiles(path, files);
        this.saveDb(files);
    }

    saveDb(files: any[]) {
        files.forEach(file => {
            this.FileRepository.insert({
                filename: file.fieldname,
                originalname: file.originalname,
                isDelete: false,
                mimetype: file.mimetype,
                size: file.encoding,
                url: "/" + file.displayName
            });
        });
    }

    findByIds(ids:number[]){
        return this.FileRepository.findByIds(ids);
    }
    
    findAll() {
        return this.FileRepository.find();
    }
}
