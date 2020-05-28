import { Controller, Post, Get, Body, Query, Param, Delete, Put } from '@nestjs/common';
import { ApiTags, ApiDefaultResponse, ApiParam } from '@nestjs/swagger';
import { TreeService } from '../service/tree.service';
import { CreateTreeDto, Tree, UpdateTreeDto } from '../dto';

@ApiTags('Tree')
@Controller('tree')
export class TreeController {
    constructor(
        private readonly treeService: TreeService
    ) {

    }


    @Post()
    create(@Body() input: CreateTreeDto) {
        return this.treeService.create(input);
    }


    @Get("getAll")
    @ApiDefaultResponse({ type: Tree.TreeDto, isArray: true })
    getAll() {
        return this.treeService.getAll();
    }

    @Get("getTrees")
    @ApiDefaultResponse({ type: Tree.TreeWithDetailDto, isArray: true })
    getTrees() {
        return this.treeService.getAllTrees();
    }

    @Get("getTree/:id")
    @ApiParam({ name: "id" })
    @ApiDefaultResponse({ type: Tree.TreeDto, isArray: true })
    getTree(@Param('id') id: string) {
        return this.treeService.getDescendantsTree(id);
    }

    @Get("roots")
    @ApiDefaultResponse({ type: Tree.TreeDto, isArray: true })
    getRoots() {
        return this.treeService.getRoot();
    }

    @Delete(":id")
    @ApiParam({ name: "id" })
    delete(@Param('id') id) {
        return this.treeService.delete(id);
    }

    @Put()
    update(@Body() body: UpdateTreeDto) {
        return this.treeService.update(body);
    }

}
