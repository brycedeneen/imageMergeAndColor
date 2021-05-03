import { Injectable, NotImplementedException } from '@nestjs/common';
import * as replaceColor from 'replace-color';
// const body = require('../assets/body.png');
import * as mergeImages from 'merge-images';
// const mergeImages = require('merge-images');
const { Canvas, Image } = require('canvas');
import * as jimp from 'jimp';

@Injectable()
export class ImagesServices {
  async replaceColorImage(newHexColor: string): Promise<any> {
    try {
      const jimpObject = await replaceColor({
        image: 'src/assets/body.png',
        colors: {
          type: 'hex',
          targetColor: '#00FF00',
          replaceColor: `#${newHexColor}`,
        },
      });

      console.log(jimpObject);

      return jimpObject;
    } catch (error) {
      console.log(error);
    }
  }

  async mergeImages(): Promise<any> {
    try {
      const data2 = await mergeImages(
        [
          { src: './src/assets/body.png', x: 0, y: 0 },
          { src: './src/assets/bodyhighlight.png', x: 0, y: 0 },
          { src: 'src/assets/brows.png', x: 475, y: 276 },
          { src: 'src/assets/eyes.png', x: 475, y: 346 },
          { src: 'src/assets/mouth.png', x: 575, y: 406 },
        ],
        {
          Canvas: Canvas,
          Image: Image,
          format: 'image/jpg',
        },
      );

      let resData = data2.replace('data:image/png;base64,', '');

      const buff = Buffer.from(resData, 'base64');

      const jimpObject = await jimp.read(buff);

      return jimpObject;
    } catch (error) {
      console.log(error);
      throw new NotImplementedException();
    }
  }

  private async recolorImage(newHexColor: string): Promise<any> {
    try {
      return new Promise((resolve, reject) => {
        replaceColor(
          {
            image: 'src/assets/body.png',
            colors: {
              type: 'hex',
              targetColor: '#00FF00',
              replaceColor: `#${newHexColor}`,
            },
          },
          (err, jimpObject: jimp) => {
            jimpObject.getBuffer('image/png', (err, success) => {
              resolve(success);
            });
          },
        );
      });
    } catch (error) {
      console.log(error);
    }
  }

  async mergeAndColorImages(newHexColor: string): Promise<any> {
    try {
      const bufferData = await this.recolorImage(newHexColor);

      const data2 = await mergeImages(
        [
          { src: bufferData, x: 0, y: 0 },
          { src: './src/assets/bodyhighlight.png', x: 0, y: 0 },
          { src: 'src/assets/brows.png', x: 475, y: 276 },
          { src: 'src/assets/eyes.png', x: 475, y: 346 },
          { src: 'src/assets/mouth.png', x: 575, y: 406 },
        ],
        {
          Canvas: Canvas,
          Image: Image,
          format: 'image/jpg',
        },
      );

      let resData = data2.replace('data:image/png;base64,', '');

      const buff = Buffer.from(resData, 'base64');

      const jimpObject2 = await jimp.read(buff);

      return jimpObject2;
    } catch (error) {
      console.log(error);
      throw new NotImplementedException();
    }
  }
}
