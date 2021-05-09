import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
// import { NFT1155DTO } from './dtos/nft1155.dto';

const Web3 = require('web3');

@Controller('home')
export class AppController {
  constructor(private readonly appService: AppService) {}

  web3 = new Web3('ws://localhost:7545');

  @Get()
  async find(): Promise<boolean> {
    try {
      const data = await this.web3.eth.getBalance(
        '0xa8A3Cc07DA00396ce7e991AF2a3fb0464bD7b5A8',
      );

      return true;
    } catch (error) {
      console.log(error);
    }
  }

  /*
  @Get(':id')
  async findOne(@Param('id') id): Promise<NFT1155DTO> {
    try {
      console.log(id);
      const returnNFT: NFT1155DTO = new NFT1155DTO();

      returnNFT.title = 'Sample NFT';
      returnNFT.type = 'object';
      returnNFT.properties = {
        name: 'My Sample NFT',
        decimals: 1,
        description: 'new sample nft desc',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/8/89/Old_Spanish_Trail_half_dollar_obverse.jpg',
      };

      return returnNFT;
    } catch (error) {
      throw new Error(error);
    }
  }
  */
}
