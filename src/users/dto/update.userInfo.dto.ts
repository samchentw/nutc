
import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { genderDataEnum, genderEnumArray} from '../../shared';
export class UpdateUserInfoDto{
    @ApiProperty()
    @IsNotEmpty()
    readonly name:string;
    
    @ApiProperty({enum:genderEnumArray})
    @IsNotEmpty()
    readonly gender:genderDataEnum;
    
    @ApiProperty({ type: 'string', format: 'date-time', example: '2018-11-21' }) 
    @IsNotEmpty()
    readonly birthday:Date;
    
    @ApiProperty()
    @IsNotEmpty()
    readonly address:string;
    
    @ApiProperty()
    @IsNotEmpty()
    readonly email:string;
}