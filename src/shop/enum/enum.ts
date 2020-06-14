export enum ShopTypeEnum {
    一般商店 = 0,
    美食商店 = 1,
}
export const ShopTypeEnumArray: number[] =
    Object.keys(ShopTypeEnum).map(key => ShopTypeEnum[key]).filter(value => typeof value === 'number');
