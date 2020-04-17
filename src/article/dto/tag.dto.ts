import { ApiProperty } from '@nestjs/swagger';

export class TagDto{ 
    @ApiProperty()
    id:number;    
    @ApiProperty()
    title:string; 
}