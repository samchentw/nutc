import { ApiProperty } from '@nestjs/swagger';
// import { TagDto } from './tag.dto';
export class ProductDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    name: string;

    @ApiProperty()
    price: number;

    @ApiProperty()
    type: string;

    @ApiProperty()
    description: string;


    @ApiProperty()
    isDelete: boolean;
    @ApiProperty()
    createTime: Date;

}

export class ProductPageDto {
    @ApiProperty()
    count: number;
    @ApiProperty({ type: ProductDto, isArray: true })
    items: ProductDto[];
}