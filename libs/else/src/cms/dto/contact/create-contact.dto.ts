import { IsString, IsNumber, IsBoolean, IsArray, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class CreateContactDto {

    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    phone: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    mail: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    message: string;

}