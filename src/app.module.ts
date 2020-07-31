import { Module, HttpModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { CoreApiService } from './coreservice/coreapi.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [CoreApiService],
})
export class AppModule {}
