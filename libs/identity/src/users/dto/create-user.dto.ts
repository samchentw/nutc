import { IsString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { genderDataEnum,genderEnumArray } from '@app/core/shared';
export class CreateUserDto{
    @ApiProperty()
    @IsString()
    readonly account:string;

    @ApiProperty()
    @IsString()
    readonly password:string;

    @ApiProperty()
    @IsString()
    readonly name:string;

    @ApiProperty({enum:genderEnumArray})    
    @IsEnum(genderDataEnum)
    readonly gender:genderDataEnum;

    @ApiProperty({ type: 'string', format: 'date-time', example: '2018-11-21' })
    readonly birthday:Date;

    @ApiProperty()
    @IsString()
    readonly address:string;

    @ApiProperty()
    @IsString()
    readonly email:string;
}