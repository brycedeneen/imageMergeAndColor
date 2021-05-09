import {
  Controller,
  Get,
  Header,
  NotImplementedException,
  Query,
  Res,
} from '@nestjs/common';
import { ImagesServices } from './images.service';

const Web3 = require('web3');

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesServices) {}

  @Get('colorTestv2')
  @Header('Content-Type', 'image/png')
  async colorTestv2(
    @Query('newhex1') newHex1,
    @Query('newhex2') newHex2,
    @Query('newhex3') newHex3,
    @Query('newhex4') newHex4,
    @Query('newhex5') newHex5,
    @Query('newhex6') newHex6,
    @Query('newhex6') newHex7,
    @Res() response,
  ): Promise<any> {
    try {
      /*
      let newHexColor = '11aaff';
      if (newHex.match(/[0-9A-Fa-f]{6}/g)) {
        newHexColor = newHex;
      }
      */

      const data = await this.imagesService.replaceColorImageV2(
        newHex1,
        newHex2,
        newHex3,
        newHex4,
        newHex5,
        newHex6,
        newHex7,
      );

      const basedata = await data.getBuffer('image/png', (err, success) => {
        console.log(success);
      });

      basedata.getBuffer('image/png', (error, responseData) => {
        // response.writeHead(200, { 'Content-Type': 'image/png' });
        response.end(responseData);
      });

      // return basedata;
    } catch (error) {
      console.log(error);
      throw new NotImplementedException();
    }
  }

  @Get('colorTest')
  @Header('Content-Type', 'image/png')
  async colorTest(@Query('newhex') newHex, @Res() response): Promise<any> {
    try {
      let newHexColor = '11aaff';
      if (newHex.match(/[0-9A-Fa-f]{6}/g)) {
        newHexColor = newHex;
      }

      const data = await this.imagesService.replaceColorImage(newHexColor);

      const basedata = await data.getBuffer('image/png', (err, success) => {
        console.log(success);
      });

      basedata.getBuffer('image/png', (error, responseData) => {
        // response.writeHead(200, { 'Content-Type': 'image/png' });
        response.end(responseData);
      });

      // return basedata;
    } catch (error) {
      console.log(error);
      throw new NotImplementedException();
    }
  }

  @Get('mergeImages')
  @Header('Content-Type', 'image/png')
  async mergeImages(@Res() response): Promise<any> {
    try {
      const data = await this.imagesService.mergeImages();

      data.getBuffer('image/png', (error, responseData) => {
        response.end(responseData);
      });
    } catch (error) {
      console.log(error);
      throw new NotImplementedException();
    }
  }

  @Get('mergeAndColor')
  @Header('Content-Type', 'image/png')
  async mergeAndColor(@Query('newhex') newHex, @Res() response): Promise<any> {
    try {
      let newHexColor = '11aaff';
      if (newHex && newHex.match(/[0-9A-Fa-f]{6}/g)) {
        newHexColor = newHex;
      }

      const data = await this.imagesService.mergeAndColorImages(newHexColor);

      data.getBuffer('image/png', (error, responseData) => {
        response.end(responseData);
      });
    } catch (error) {
      console.log(error);
      throw new NotImplementedException();
    }
  }
}
