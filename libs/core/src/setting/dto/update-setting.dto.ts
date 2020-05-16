import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class UpdateSettingDto {

    @ApiProperty()
    @IsString()
    key: string;


    @ApiProperty()
    @IsString()
    value: string;

    @ApiProperty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsBoolean()
    enable: boolean;
}