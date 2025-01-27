import { Test, TestingModule } from '@nestjs/testing';
import { ONewsController } from './o-news.controller';
import { ONewsService } from './o-news.service';

describe('ONewsController', () => {
  let controller: ONewsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ONewsController],
      providers: [ONewsService],
    }).compile();

    controller = module.get<ONewsController>(ONewsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
