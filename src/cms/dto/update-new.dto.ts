import { ApiProperty } from '@nestjs/swagger';

export class UpdateNewsDto{
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