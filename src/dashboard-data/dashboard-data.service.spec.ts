import { Test, TestingModule } from '@nestjs/testing';
import { DashboardDataService } from './dashboard-data.service';

describe('DashboardDataService', () => {
  let service: DashboardDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DashboardDataService],
    }).compile();

    service = module.get<DashboardDataService>(DashboardDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
