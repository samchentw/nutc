import { ApiProperty } from '@nestjs/swagger';
// import { TagDto } from './tag.dto';
export class ShopDto{ 
    @ApiProperty()
    id: number;
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
    isDelete: boolean;
    @ApiProperty()
    createTime:Date;
  
}

export class ShopPageDto{ 
    @ApiProperty()
    count:number;
    @ApiProperty({type:ShopDto,isArray:true})
    items:ShopDto[];
}