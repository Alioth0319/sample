import { Test, TestingModule } from '@nestjs/testing';
import { DeepSeekController } from './deepseek.controller';

describe('DeepseekController', () => {
  let controller: DeepSeekController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeepSeekController],
    }).compile();

    controller = module.get<DeepSeekController>(DeepSeekController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
