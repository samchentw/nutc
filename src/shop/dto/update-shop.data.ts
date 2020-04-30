import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateShopDto {
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
    delete: boolean;
}