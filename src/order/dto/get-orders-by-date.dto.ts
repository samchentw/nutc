import { IsNumber, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class GetOrdersByDateDto {

    @ApiProperty()
    @IsNotEmpty()
    readonly startDate: Date;

    @ApiProperty()
    @IsNotEmpty()
    readonly endDate: Date;
}