import { IsString, IsEnum, IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { genderDataEnum, genderEnumArray } from '@app/core/shared';
export class CreateUserDto {
    @ApiProperty()
    @IsNotEmpty()
    @Length(5)
    readonly account: string;

    @ApiProperty()
    @IsNotEmpty()
    @Length(5)
    readonly password: string;

    @ApiProperty()
    @IsNotEmpty()
    readonly name: string;

    @ApiProperty({ enum: genderEnumArray })
    @IsEnum(genderDataEnum)
    readonly gender: genderDataEnum;

    @ApiProperty({ type: 'string', format: 'date-time', example: '2018-11-21' })
    readonly birthday: Date;

    @ApiProperty()
    @IsNotEmpty()
    readonly address: string;

    @ApiProperty()
    @IsNotEmpty()
    readonly email: string;
}