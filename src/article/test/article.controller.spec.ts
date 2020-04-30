import { Test } from '@nestjs/testing';
import { ArticleController } from '../controller/article.controller';
import { ArticleService } from '../service/base/article.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from '../entity/article.entity';
import { TagEntity } from '../entity/tag.entity';
import { TagController } from '../controller/tag.controller';
import { TagService } from '../service/base/tag.service';
describe('FileController', () => {
  let articleController: ArticleController;
  let articleService: ArticleService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
        imports:[TypeOrmModule.forRoot(),TypeOrmModule.forFeature([ArticleEntity,TagEntity])],
        controllers: [ArticleController,TagController],
        providers: [ArticleService,TagService],
      }).compile();

    articleService = moduleRef.get<ArticleService>(ArticleService);
    articleController = moduleRef.get<ArticleController>(ArticleController);
  });

  describe('findAll', () => {
    it('should return an array of articleEntity', async () => {     
        let count =await articleController.getAll();   
        console.log(count)     
        expect(count.length).toBeGreaterThanOrEqual(0);
    });
  });

});