export enum genderDataEnum {
    男性 = 0,
    女性 = 1,
}
export const genderEnumArray:number[]=Object.keys(genderDataEnum).map(key => genderDataEnum[key]).filter(value => typeof value === 'number');
