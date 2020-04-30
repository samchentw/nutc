import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateShopDto{
    @ApiProperty()
    name: string;

    @ApiProperty()
    phone: string;
  
    @ApiProperty()
    address: string;
  
    @ApiProperty()
    description: string;
  
    @ApiProperty()
    remark: string;
  
    @ApiProperty()
    delete: boolean; 
}