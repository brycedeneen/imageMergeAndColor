import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImagesController } from './images/images.controller';
import { ImagesServices } from './images/images.service';

@Module({
  imports: [],
  controllers: [AppController, ImagesController],
  providers: [AppService, ImagesServices],
})
export class AppModule {}
