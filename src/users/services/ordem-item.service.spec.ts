import { Test, TestingModule } from '@nestjs/testing';
import { OrdemItemService } from './ordem-item.service';

describe('OrdemItemService', () => {
  let service: OrdemItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdemItemService],
    }).compile();

    service = module.get<OrdemItemService>(OrdemItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
