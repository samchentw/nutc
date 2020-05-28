import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTreeDto {
    @ApiProperty()
    name: string;
    @ApiProperty()
    @Exclude()
    parentId: string;
}