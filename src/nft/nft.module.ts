import { Module } from '@nestjs/common';
import { ImagesController } from './images.controller';
import { ImagesServices } from './images.service';
import { NFTController } from './nft.controller';

@Module({
  imports: [],
  controllers: [ImagesController, NFTController],
  providers: [ImagesServices],
})
export class NFTModule {}
