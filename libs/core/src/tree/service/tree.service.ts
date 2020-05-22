import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository } from 'typeorm';
import { CreateTreeDto, CreateTreeWithDetailDto, UpdateTreeDto } from '../dto';
import { TreeEntity } from '../entity/tree.entity';
import { plainToClass } from 'class-transformer';
import { TreeBaseService } from '@app/core/shared'
@Injectable()
export class TreeService {
    constructor(
        @InjectRepository(TreeEntity)
        private readonly Repository: TreeRepository<TreeEntity>
    ) {

    }

    async create(input: CreateTreeDto) {
        var parent = null;
        if (input.parentId) parent = await this.Repository.findOne({ id: input.parentId });;
        var result = plainToClass(TreeEntity, input);
        result.parent = parent;
        return await this.Repository.save(result);
    }

    getAll() {
        return this.Repository.find();
    }

    getAllTrees() {
        return this.Repository.findTrees();
    }

    async getDescendantsTree(id: number) {
        var tree = await this.Repository.findOne(id);
        // return this.Repository.findAncestorsTree(tree)
        return this.Repository.findDescendantsTree(tree)
    }

    getRoot() {
        return this.Repository.findRoots();
    }

    test() {
        // return this.Repository.merge()
    }

    update(input: UpdateTreeDto) {
        delete input.id;
        return this.Repository.update({ id: input.id }, input);
    }

    delete(id: number) {
        return this.Repository.delete({ id });
    }
}
