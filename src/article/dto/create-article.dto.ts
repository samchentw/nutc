import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateArticleDto{   
    @ApiProperty()
    @IsNotEmpty()
    title:string;

    @ApiProperty()
    @IsNotEmpty()    
    text:string;

    @ApiProperty({type:Number, isArray:true})
    tags:number[];
}