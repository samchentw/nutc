import { Controller, Post, Get, Body } from '@nestjs/common';
import { ApiTags, ApiDefaultResponse } from '@nestjs/swagger';
import { TreeService } from '../service/tree.service';
import { CreateTreeDto, Tree } from '../dto';

@ApiTags('Tree')
@Controller('tree')
export class TreeController {
    constructor(
        private readonly treeService:TreeService
    ) {
        
    }


    @Post()
    create(@Body() input:CreateTreeDto){
        return this.treeService.create(input);
    }


    @Get("getAll")
    @ApiDefaultResponse({type:Tree.TreeDto,isArray:true})
    getAll(){
        return this.treeService.getAll();
    }

    @Get("getTrees")
    @ApiDefaultResponse({type:Tree.TreeWithDetailDto,isArray:true})
    getTrees(){
        return this.treeService.getAllTrees();
    }
}
