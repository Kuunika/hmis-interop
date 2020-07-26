import { Module, HttpModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DashboardDataService } from './dashboard-data/dashboard-data.service';
import { OhspService } from './ohsp/ohsp.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [AppService, DashboardDataService, OhspService],
})
export class AppModule {}
