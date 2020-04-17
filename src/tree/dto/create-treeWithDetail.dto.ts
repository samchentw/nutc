import { CreateTreeDto } from './create-tree.dto';
import { TreeEntity } from '../entity/tree.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTreeWithDetailDto extends CreateTreeDto{
    @ApiProperty()
    parent:TreeEntity;
}
