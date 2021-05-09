import { IsNumber } from './utils/is-number';
import { GetDelta } from './utils/get-delta';
import { ReplaceColor } from './utils/convert-color';
import { ValidateColors } from './utils/validate-colors';

const Jimp = require('jimp');
const ReplaceColorError = require('./utils/replace-color-error');

import * as jimp from 'jimp';

export default class ReplaceColors {
  static replace = async (
    image: string = '',
    colors = {
      type: 'hex',
      targetColor: '#f36d21',
      replaceColor: '#ffffff',
    } ||
      Array({
        type: 'hex',
        targetColor: '#f36d21',
        replaceColor: '#ffffff',
      }),
    formula: string = 'E00',
    deltaE: number = 2.3,
  ): Promise<jimp> => {
    return new Promise((resolve, reject) => {
      if (!image) {
        reject(new ReplaceColorError('PARAMETER_REQUIRED', 'options.image'));
      }

      if (Array.isArray(colors)) {
        colors.map((color) => {
          const colorsValidationError = ValidateColors.validate(color);
          if (colorsValidationError) {
            reject(
              new ReplaceColorError(
                colorsValidationError.code,
                colorsValidationError.field,
              ),
            );
          }
        });
      } else {
        const colorsValidationError = ValidateColors.validate(colors);
        if (colorsValidationError) {
          reject(
            new ReplaceColorError(
              colorsValidationError.code,
              colorsValidationError.field,
            ),
          );
        }
      }

      if (
        !(
          typeof formula === 'string' && ['E76', 'E94', 'E00'].includes(formula)
        )
      ) {
        reject(new ReplaceColorError('PARAMETER_INVALID', 'options.formula'));
      }

      if (!(IsNumber.validate(deltaE) && deltaE >= 0 && deltaE <= 100)) {
        reject(new ReplaceColorError('PARAMETER_INVALID', 'options.deltaE'));
      }

      Jimp.read(image)
        .then((jimpObject: jimp) => {
          if (Array.isArray(colors)) {
            colors.map((color) => {
              const targetLABColor = ReplaceColor.replace(
                color.type,
                'lab',
                color.targetColor,
              );
              const replaceRGBColor = ReplaceColor.replace(
                color.type,
                'rgb',
                color.replaceColor,
              );

              jimpObject.scan(
                0,
                0,
                jimpObject.bitmap.width,
                jimpObject.bitmap.height,
                (x, y, idx) => {
                  const currentLABColor = ReplaceColor.replace('rgb', 'lab', [
                    jimpObject.bitmap.data[idx],
                    jimpObject.bitmap.data[idx + 1],
                    jimpObject.bitmap.data[idx + 2],
                  ]);

                  if (
                    GetDelta.deltaE(currentLABColor, targetLABColor, formula) <=
                    deltaE
                  ) {
                    jimpObject.bitmap.data[idx] = replaceRGBColor[0];
                    jimpObject.bitmap.data[idx + 1] = replaceRGBColor[1];
                    jimpObject.bitmap.data[idx + 2] = replaceRGBColor[2];
                    if (replaceRGBColor[3] !== null)
                      jimpObject.bitmap.data[idx + 3] = replaceRGBColor[3];
                  }
                },
              );
            });

            resolve(jimpObject);
          } else {
            const targetLABColor = ReplaceColor.replace(
              colors.type,
              'lab',
              colors.targetColor,
            );
            const replaceRGBColor = ReplaceColor.replace(
              colors.type,
              'rgb',
              colors.replaceColor,
            );

            jimpObject.scan(
              0,
              0,
              jimpObject.bitmap.width,
              jimpObject.bitmap.height,
              (x, y, idx) => {
                const currentLABColor = ReplaceColor.replace('rgb', 'lab', [
                  jimpObject.bitmap.data[idx],
                  jimpObject.bitmap.data[idx + 1],
                  jimpObject.bitmap.data[idx + 2],
                ]);

                if (
                  GetDelta.deltaE(currentLABColor, targetLABColor, formula) <=
                  deltaE
                ) {
                  jimpObject.bitmap.data[idx] = replaceRGBColor[0];
                  jimpObject.bitmap.data[idx + 1] = replaceRGBColor[1];
                  jimpObject.bitmap.data[idx + 2] = replaceRGBColor[2];
                  if (replaceRGBColor[3] !== null)
                    jimpObject.bitmap.data[idx + 3] = replaceRGBColor[3];
                }
              },
            );
            resolve(jimpObject);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}
