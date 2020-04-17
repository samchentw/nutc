import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
export class CreateNewsDto{   
    @ApiProperty() 
    @Exclude()
    newsTypeId:number;
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
}

