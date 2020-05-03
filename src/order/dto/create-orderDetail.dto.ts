import { IsNumber, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export  class CreateOrderDetailDto{
    
    @ApiProperty()
    @IsNotEmpty()
    readonly productId:number;
    
    @ApiProperty()
    @IsNotEmpty()
    readonly count:number;
}