import { Injectable, Inject } from '@nestjs/common';

import { InjectRepository, } from '@nestjs/typeorm';
import { Repository, Entity } from 'typeorm';
import * as _ from 'lodash';
import { BaseService } from '@app/core/shared';
import { Blog, BlogDetail } from '../entity/blog.entity';
@Injectable()
export class BlogService {
    constructor(
        @InjectRepository(Blog)
        public repository: Repository<Blog>,
    ) {
        // this.test();
    }

    test() {

        var datas: BlogDetail[] = [
            { description: "123", image: "134" },
            { description: "ab", image: "1d" }
        ]
        var input: Blog = new Blog();
        input.title = "123";
        input.datas = datas;

        this.repository.insert(input);
    }
}
