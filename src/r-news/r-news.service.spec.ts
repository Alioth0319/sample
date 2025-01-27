import { Test, TestingModule } from '@nestjs/testing';
import { RNewsService } from './r-news.service';

describe('RNewsService', () => {
  let service: RNewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RNewsService],
    }).compile();

    service = module.get<RNewsService>(RNewsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
