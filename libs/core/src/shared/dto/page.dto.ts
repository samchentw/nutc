import { IsString, IsNotEmpty } from 'class-validator';

export class PageDto{    
    @IsNotEmpty()
    skip:number;
    
    @IsNotEmpty()
    take:number;
}