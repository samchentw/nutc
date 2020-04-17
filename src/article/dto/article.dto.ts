import { ApiProperty } from '@nestjs/swagger';
import { TagDto } from './tag.dto';
export class ArticleDto{ 
    @ApiProperty()
    id:number;    
    @ApiProperty()
    title:string; 
    @ApiProperty()   
    text:string;
    @ApiProperty()
    createTime:Date;
    @ApiProperty({type:TagDto,isArray:true})
    tags:TagDto[];
}

export class ArticlePageDto{ 
    @ApiProperty()
    count:number;
    @ApiProperty({type:ArticleDto,isArray:true})
    items:ArticleDto[];
}

export class ArticleQueryPageDto {
    @ApiProperty()
    skip:number;
    @ApiProperty()
    take:number;
    @ApiProperty()
    title?:string;
    @ApiProperty()
    text?:string;
    @ApiProperty()
    tagId?:number;
}




