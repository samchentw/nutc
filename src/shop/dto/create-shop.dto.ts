import { IsString, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateShopDto{
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    phone: string;
  
    @ApiProperty()
    @IsString()
    address: string;
  
    @ApiProperty()
    @IsString()
    description: string;
  
    @ApiProperty()
    @IsString()
    remark: string;
  
    @ApiProperty()
    isDelete: boolean;
    
    @ApiProperty({type:Number, isArray:true})
    @IsArray()
    imageIds: number[];
}