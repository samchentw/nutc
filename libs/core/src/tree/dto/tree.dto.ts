import { ApiProperty } from '@nestjs/swagger';

export namespace Tree{
    export class TreeWithDetailDto{
        @ApiProperty()
        id: number;
        @ApiProperty()
        name: string;
        @ApiProperty({type:TreeWithDetailDto,isArray:true})
        children: TreeWithDetailDto[];    
    }

    export class TreeDto{
        @ApiProperty()
        id: number;
        @ApiProperty()
        name: string;
    }
}