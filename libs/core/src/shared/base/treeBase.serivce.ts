import { Injectable } from '@nestjs/common';
import { TreeRepository, InsertResult, UpdateResult, DeleteResult } from 'typeorm';
import * as _ from 'lodash';
import { classToClass, plainToClass } from 'class-transformer';
export interface treeBaseDto {
    id: number;
    parentId: number;
}

export interface treeWithParent {
    parent: any;
}

@Injectable()
export abstract class TreeBaseService<Entity, CreateDto extends treeBaseDto, UpdateDto extends treeBaseDto, CreateTreeWithDetailDto extends treeWithParent>{

    constructor(
        public repository: TreeRepository<Entity>,
    ) {

    }

    async create(input: any): Promise<Entity> {
        var parent = null;
        var result: CreateTreeWithDetailDto;
        var d: CreateDto
        if (input.parentId) parent = await this.repository.findOne(input.parentId);
        // plainToClass(Entity,result)
        result = input;
        result.parent = parent;
        return await this.repository.save(result);
    }

    async get(id): Promise<Entity> {
        return await this.repository.findOne(id);
    }

    async getAll(): Promise<Entity[]> {
        return await this.repository.find();
    }

    async update(id: number, input: any): Promise<UpdateResult> {
        delete input.id;
        return this.repository.update(id, input);
    }

    async delete(id: number): Promise<DeleteResult> {
        return await this.repository.delete(id);
    }


    async getAllTrees() {
        return await this.repository.findTrees();
    }

    async getDescendantsTree(id: number) {
        var tree = await this.repository.findOne(id);
        // return this.Repository.findAncestorsTree(tree)
        return this.repository.findDescendantsTree(tree)
    }

    async getRoot() {
        return await this.repository.findRoots();
    }


    delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

}