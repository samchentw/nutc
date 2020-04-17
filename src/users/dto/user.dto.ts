import { genderDataEnum, genderEnumArray } from '../../shared';
import { ApiProperty } from '@nestjs/swagger';

export namespace User{
   

    export class UserInfoDto{
        @ApiProperty()
        name: string;
        @ApiProperty({enum:genderEnumArray})
        gender: genderDataEnum;
        @ApiProperty({ type: 'string', format: 'date-time', example: '2018-11-21' })
        birthday: Date;
        @ApiProperty()
        address: string;
        @ApiProperty()
        email: string;
    }

    export class UserDto{
        @ApiProperty()
        id: string;
        @ApiProperty()
        account: string;
        @ApiProperty({type:UserInfoDto})
        userinfo:UserInfoDto;          
    }

    export class TokenDto{
        @ApiProperty()
        readonly expires_in:string;
        @ApiProperty()
        readonly token:string;
    }
}