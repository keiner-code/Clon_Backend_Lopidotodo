import { Test, TestingModule } from '@nestjs/testing';
import { OrdemItemController } from './ordem-item.controller';

describe('OrdemItemController', () => {
  let controller: OrdemItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdemItemController],
    }).compile();

    controller = module.get<OrdemItemController>(OrdemItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
