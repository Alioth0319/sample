import { Test, TestingModule } from '@nestjs/testing';
import { RNewsController } from './r-news.controller';
import { RNewsService } from './r-news.service';

describe('RNewsController', () => {
  let controller: RNewsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RNewsController],
      providers: [RNewsService],
    }).compile();

    controller = module.get<RNewsController>(RNewsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
