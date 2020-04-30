import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserPwd{
    @ApiProperty()
    @IsNotEmpty()
    readonly password:string;

    @ApiProperty()
    @IsNotEmpty()
    readonly Newpassword:string;
}