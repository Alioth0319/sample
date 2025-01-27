import { Test, TestingModule } from '@nestjs/testing';
import { ONewsService } from './o-news.service';

describe('ONewsService', () => {
  let service: ONewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ONewsService],
    }).compile();

    service = module.get<ONewsService>(ONewsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
