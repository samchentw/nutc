import { genderDataEnum, genderEnumArray } from '@app/core/shared';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export namespace User {


    export class UserInfoDto {

        @ApiProperty()
        @Expose()
        id: number;

        @ApiProperty()
        @Expose()
        name: string;

        @ApiProperty({ enum: genderEnumArray })
        @Expose()
        gender: genderDataEnum;

        @ApiProperty({ type: 'string', format: 'date-time', example: '2018-11-21' })
        @Expose()
        birthday: Date;

        @ApiProperty()
        @Expose()
        address: string;

        @ApiProperty()
        @Expose()
        email: string;
    }

    export class UserDto {
        @ApiProperty()
        @Expose()
        id: string;
        @ApiProperty()
        @Expose()
        account: string;
        @ApiProperty({ type: UserInfoDto })
        @Expose()
        @Type(() => UserInfoDto)
        userinfo: UserInfoDto;
    }

    export class TokenDto {
        @ApiProperty()
        readonly expires_in: string;
        @ApiProperty()
        readonly token: string;
    }
}