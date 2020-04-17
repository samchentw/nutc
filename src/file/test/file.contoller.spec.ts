import { Test } from '@nestjs/testing';
import { FileController } from '../controller/file.controller';
import { FileService } from '../service/file.service';
import { FileEntity } from '../entity/file.entity';
import { UploadFactory } from '../../shared';
import { TypeOrmModule } from '@nestjs/typeorm';
describe('FileController', () => {
  let fileController: FileController;
  let fileService: FileService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
        imports:[TypeOrmModule.forRoot(),TypeOrmModule.forFeature([FileEntity])],
        controllers: [FileController],
        providers: [FileService,UploadFactory],
      }).compile();

    fileService = moduleRef.get<FileService>(FileService);
    fileController = moduleRef.get<FileController>(FileController);
  });

  describe('findAll', () => {
    it('should return an array of FileEntity', async () => {     
        let count =await fileController.getAll();            
        
        expect(count.length).toBeGreaterThanOrEqual(0);
    });
  });
});