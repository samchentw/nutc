import { Injectable, Inject } from '@nestjs/common';
import { Repository, UpdateResult, InsertResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SaveFileService } from '../../shared';
import { FileEntity } from '../entity/file.entity';


@Injectable()
export class FileService {
    constructor(
        @Inject('SaveFileFactory') private  saveFileService:SaveFileService,
        @InjectRepository(FileEntity)
        private readonly FileRepository:Repository<FileEntity>,
    ){}

   saveFile(files:any[]){
       var path = process.cwd()+"/public/temp/";       
       this.saveFileService.saveFiles(path,files);
       this.saveDb(files);
   }

   saveDb(files:any[]){       
       files.forEach(file=>{
        this.FileRepository.insert({
            filename:file.fieldname,
            originalname:file.originalname,
            isDelete:false,
            mimetype:file.mimetype,
            size:file.encoding,            
            url:"/temp/"+file.originalname                    
        });
       });
   }

   findAll(){
       return this.FileRepository.find();
   }
}
