import { deliveryEnum, paymentEnum, orderStateEnum } from "../enum/enum";
import { Expose, Type, Exclude } from "class-transformer";
import { User } from '@app/identity/users/dto/user.dto'

export class ProductDto {
    @Expose()
    name: string;
    @Expose()
    price: number;
    @Expose()
    productImage: string
}

export class OrderDetailDto {
    @Expose()
    id: number;

    @Expose()
    createTime: Date;

    @Expose()
    count: number;

    @Expose()
    @Type(() => ProductDto)
    product: ProductDto;

}

export class ConsumerBasicDto {
    @Expose()
    id: number;
    @Expose()
    createTime: Date;
    @Expose()

    @Expose()
    @Type(() => User.UserDto)
    userId: User.UserDto;
}

export class OrderResult {
    @Expose()
    id: number;

    @Expose()
    createTime: Date;

    @Expose()
    delivery: deliveryEnum;

    @Expose()
    payment: paymentEnum;

    @Expose()
    deliveryTime: Date;

    @Expose()
    state: orderStateEnum;

    @Expose()
    address: string;

    @Expose()
    total: number;

    @Expose({ since: 2 })
    @Type(() => ConsumerBasicDto)
    consumer: ConsumerBasicDto;

    @Expose()
    @Type(() => OrderDetailDto)
    orderDetail: OrderDetailDto[];

    @Expose()
    get userData() {
        return this.consumer.userId.userinfo;
    }
}
