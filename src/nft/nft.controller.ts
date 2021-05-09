import { Controller, Get, Param } from '@nestjs/common';
import { ERC721MetaDataDTO } from '../dtos/erc721MetaData.dto';

// const Web3 = require('web3');

@Controller('nft')
export class NFTController {
  constructor() {}

  @Get(':id')
  async colorTest(@Param('id') id: string): Promise<ERC721MetaDataDTO> {
    try {
      const data: ERC721MetaDataDTO = new ERC721MetaDataDTO();

      data.description = 'Some cool description';
      data.image = 'http://localhost:3000/images/mergeAndColor?hexHex=ffaa33';
      data.name = 'Common Yeti';

      return data;
    } catch (error) {
      console.log(error);

      throw new Error(error);
    }
  }
}
