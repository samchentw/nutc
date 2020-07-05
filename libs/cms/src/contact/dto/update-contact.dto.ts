import { IsString, IsNumber, IsBoolean, IsArray, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class UpdateContactDto {

    @ApiProperty()
    id:number;

    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    phone: string;

    @ApiProperty()
    @IsString()
    mail: string;

    @ApiProperty()
    @IsString()
    message: string;

}