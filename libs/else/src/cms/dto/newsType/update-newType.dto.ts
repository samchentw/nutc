import { ApiProperty } from '@nestjs/swagger';
export class UpdateNewsTypeDto{
    @ApiProperty()
    name:string;
}