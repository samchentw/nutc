import { ApiProperty } from '@nestjs/swagger';
export class CreateNewsTypeDto{   
   @ApiProperty() 
   name:string;
}
