import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateUserPwd{
    @ApiProperty()
    @IsNotEmpty()
    readonly password:string;

    @ApiProperty()
    @IsNotEmpty()
    readonly Newpassword:string;
}