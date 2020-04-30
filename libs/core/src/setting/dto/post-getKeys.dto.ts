import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class PostGetKeysDto{ 
    @ApiProperty({type:String,isArray:true})   
    key:string[]; 
}