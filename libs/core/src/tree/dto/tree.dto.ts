import { ApiProperty } from '@nestjs/swagger';

export namespace Tree {
    export class TreeWithDetailDto {
        @ApiProperty()
        id: string;
        @ApiProperty()
        name: string;
        @ApiProperty({ type: TreeWithDetailDto, isArray: true })
        children: TreeWithDetailDto[];
    }

    export class TreeDto {
        @ApiProperty()
        id: string;
        @ApiProperty()
        name: string;
    }
}