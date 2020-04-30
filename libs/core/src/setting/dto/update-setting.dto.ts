import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class UpdateSettingDto{ 
   
    
    @ApiProperty()   
    @IsNotEmpty()
    value:string;

    @ApiProperty()   
    @IsNotEmpty()
    description:string;

    @ApiProperty()   
    @IsNotEmpty()
    enable:boolean;
}