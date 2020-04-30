import { Test, TestingModule } from '@nestjs/testing';
import { ElseService } from './else.service';

describe('ElseService', () => {
  let service: ElseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ElseService],
    }).compile();

    service = module.get<ElseService>(ElseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
