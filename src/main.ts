import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, 'assets'));
  // app.setBaseViewsDir(join(__dirname, '..', 'views'));
  // app.setViewEngine('hbs');

  await app.listen(3000);
}
bootstrap();

/*
//TODO: subscibe to event
const Web3 = require('web3');

const web3 = new Web3('ws://localhost:7545');

web3.eth.subscribe('NewlyCreatedAnimal', {}, (d: any) => {
  console.log(d);
});
*/
