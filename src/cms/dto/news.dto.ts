import { ApiProperty } from '@nestjs/swagger';

export namespace News{
    export class NewsDto{
        @ApiProperty()
        id:number;
        @ApiProperty()
        title: string;
        @ApiProperty()   
        subtitle:string; 
        @ApiProperty()
        description: string;    
        @ApiProperty()
        url:string;
        @ApiProperty()
        isActive: boolean;        
        @ApiProperty()
        createTime:Date;
    }
}
