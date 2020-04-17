
import { ApiProperty } from '@nestjs/swagger';
export class FileDto{
    @ApiProperty()
    id:number;
    @ApiProperty()
    filename:string
    @ApiProperty()
    originalname:string;
    @ApiProperty()
    size:number;
    @ApiProperty()
    createTime:Date;
    @ApiProperty()
    mimetype:string;
    @ApiProperty()
    isDelete:boolean;
    @ApiProperty()
    url:string;

}