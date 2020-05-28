import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTreeDto {
    @ApiProperty()
    id: string;
    @ApiProperty()
    name: string;
}