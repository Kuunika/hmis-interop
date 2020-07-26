import { Test, TestingModule } from '@nestjs/testing';
import { OhspService } from './ohsp.service';

describe('OhspService', () => {
  let service: OhspService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OhspService],
    }).compile();

    service = module.get<OhspService>(OhspService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
