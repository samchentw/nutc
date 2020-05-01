import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';
import * as fs from 'fs';
import * as express from 'express';


export const UploadFactory = {
    provide: "SaveFileFactory",
    useFactory: () => {
        return new SaveFileService();
    }
}

@Injectable()
export class SaveFileService {
    constructor(
    ) {
    }


    saveFile(path: string, file) {
        fs.writeFile(path + file.displayName, file.buffer, function (err) {
            if (err) return console.log(err);
        });
    }

    saveFiles(path: string, files: any[]) {
        files.forEach((file) => {
            this.saveFile(path, file);
        });
    }



    deleteFile(file) {
        fs.unlink(file, (err) => {
            if (err) return console.log(err);
        });
    }
}
