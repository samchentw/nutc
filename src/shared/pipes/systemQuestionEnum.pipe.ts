import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import * as _ from 'lodash';
@Injectable()
export class SystemQuestionEnumPipe implements PipeTransform<any>{
    async transform(value:any, { metatype }: ArgumentMetadata){
        if(!metatype || !this.toValidate(value.type)){
            return value;
        }else{
            throw new BadRequestException('Validation failed');
        }      
    }

    private toValidate(type:string):boolean{
        const types=["多選題","問答題"];
        return  !_.includes(types,type);
    }
}