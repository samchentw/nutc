import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RoleDto{

    @ApiProperty()
    @IsNotEmpty()
    readonly name:string;

    @ApiProperty()
    readonly description:string;

}