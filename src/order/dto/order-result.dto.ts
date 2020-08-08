import { deliveryEnum, paymentEnum, orderStateEnum, orderStateEnumArray, paymentEnumArray } from "../enum/enum";
import { Expose, Type, Exclude } from "class-transformer";
import { User } from '@app/identity/users/dto/user.dto'
import { ApiTags, ApiProperty, ApiParam, ApiDefaultResponse, ApiBearerAuth } from '@nestjs/swagger';
export class ProductDto {
    @Expose()
    @ApiProperty()
    name: string;

    @Expose()
    @ApiProperty()
    price: number;

    @Expose()
    @ApiProperty()
    productImage: string
}

export class OrderDetailDto {
    @Expose()
    @ApiProperty()
    id: number;

    @Expose()
    @ApiProperty()
    createTime: Date;

    @Expose()
    @ApiProperty()
    count: number;

    @Expose()
    @ApiProperty({ type: ProductDto })
    @Type(() => ProductDto)
    product: ProductDto;

}

export class ConsumerBasicDto {
    @Expose()
    @ApiProperty()
    id: number;

    @Expose()
    @ApiProperty()
    createTime: Date;


    @Expose()
    @ApiProperty({ type: User.UserDto })
    @Type(() => User.UserDto)
    userId: User.UserDto;
}

export class OrderResultDto {
    @Expose()
    @ApiProperty()
    id: number;

    @Expose()
    @ApiProperty()
    createTime: Date;

    @Expose()
    @ApiProperty()
    delivery: deliveryEnum;

    @Expose()
    @ApiProperty({ enum: paymentEnumArray })
    payment: paymentEnum;

    @Expose()
    @ApiProperty()
    deliveryTime: Date;

    @Expose()
    @ApiProperty({ enum: orderStateEnumArray })
    state: orderStateEnum;

    @Expose()
    @ApiProperty()
    address: string;

    @Expose()
    @ApiProperty()
    total: number;

    @Expose({ since: 2 })
    // @ApiProperty({ type: ConsumerBasicDto })
    @Type(() => ConsumerBasicDto)
    consumer: ConsumerBasicDto;

    @Expose()
    @ApiProperty({ type: OrderDetailDto })
    @Type(() => OrderDetailDto)
    orderDetail: OrderDetailDto[];

    @Expose()
    @ApiProperty({ type: User.UserInfoDto })
    get userData() {
        return this.consumer.userId.userinfo;
    }
}
