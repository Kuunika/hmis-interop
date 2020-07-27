import { Module, HttpModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { DashboardDataService } from './dashboard-data/dashboard-data.service';
import { CoreApiService } from './coreservice/coreapi.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [DashboardDataService, CoreApiService],
})
export class AppModule {}
