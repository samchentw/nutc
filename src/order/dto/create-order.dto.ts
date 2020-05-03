import { IsString, IsNotEmpty, IsEmail, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateOrderDetailDto } from './create-orderDetail.dto';
import { deliveryEnum, orderStateEnum, paymentEnum, paymentEnumArray, deliveryEnumArray } from '../enum/enum'
export class CreateOrderDto {

    @ApiProperty({ enum: deliveryEnumArray })
    @IsNotEmpty()
    readonly delivery: deliveryEnum;

    @ApiProperty({ enum: paymentEnumArray })
    @IsNotEmpty()
    readonly payment: paymentEnum;

    @ApiProperty({ type: 'string', format: 'date-time', example: '2018-11-21' })
    @IsNotEmpty()
    readonly deliveryTime: Date;

    // @ApiProperty({enum:["準備中",'運送中',"已送達","未出貨"]})
    // @IsNotEmpty()
    // readonly state:statetype;

    @ApiProperty()
    @IsNotEmpty()
    readonly address: string;

    @ApiProperty({ type: [CreateOrderDetailDto] })
    @IsNotEmpty()
    readonly orderDetail: Array<CreateOrderDetailDto>;

    @ApiProperty()
    @IsNumber()
    readonly usePoints: number;
}