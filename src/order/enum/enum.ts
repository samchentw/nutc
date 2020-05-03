export enum deliveryEnum {
    貨到付款 = 0,
    信用卡 = 1,
}

export const deliveryEnumArray: number[] =
    Object.keys(deliveryEnum).map(key => deliveryEnum[key]).filter(value => typeof value === 'number');



export enum paymentEnum {
    超商取貨 = 0,
    寄送到府 = 1
}

export const paymentEnumArray: number[] =
    Object.keys(paymentEnum).map(key => paymentEnum[key]).filter(value => typeof value === 'number');


export enum orderStateEnum {
    準備中 = 0,
    運送中 = 1,
    已送達 = 2,
    未出貨 = 3
}

export const orderStateEnumArray: number[] =
    Object.keys(orderStateEnum).map(key => orderStateEnum[key]).filter(value => typeof value === 'number');
