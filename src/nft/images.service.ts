import { Injectable, NotImplementedException } from '@nestjs/common';
import * as jimp from 'jimp';
// const body = require('../assets/body.png');
import * as mergeImages from 'merge-images';
import * as replaceColor from 'replace-color';
import ReplaceColors from '../convertColors/replace-color';
// const mergeImages = require('merge-images');
const { Canvas, Image } = require('canvas');

// 3953a4 - hands & face
// 38c0c4 - body accents
// ed2024 - nose
// b9529f - fangs
// 69bd45 - eye center
// f6eb14 - eye outline
// f36d21 - fur color
// 000000 - outline

// R G B

@Injectable()
export class ImagesServices {
  async replaceColorImageV2(
    newHexColor1: string,
    newHexColor2: string,
    newHexColor3: string,
    newHexColor4: string,
    newHexColor5: string,
    newHexColor6: string,
    newHexColor7: string,
  ): Promise<any> {
    try {
      const jimpObject = await ReplaceColors.replace('src/assets/yetiv2.png', [
        {
          type: 'hex',
          targetColor: '#3953a4',
          replaceColor: `#${newHexColor1}`,
        },
        {
          type: 'hex',
          targetColor: '#38c0c4',
          replaceColor: `#${newHexColor2}`,
        },
        {
          type: 'hex',
          targetColor: '#ed2024',
          replaceColor: `#${newHexColor3}`,
        },
        {
          type: 'hex',
          targetColor: '#b9529f',
          replaceColor: `#${newHexColor4}`,
        },
        {
          type: 'hex',
          targetColor: '#69bd45',
          replaceColor: `#${newHexColor5}`,
        },
        {
          type: 'hex',
          targetColor: '#f6eb14',
          replaceColor: `#${newHexColor6}`,
        },
        {
          type: 'hex',
          targetColor: '#f36d21',
          replaceColor: `#${newHexColor7}`,
        },
      ]);

      return jimpObject;
    } catch (error) {
      console.log(error);
    }
  }

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
