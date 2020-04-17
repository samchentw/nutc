import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTreeDto {    
    @ApiProperty() 
    id:number;
    @ApiProperty()     
    name: string;
}