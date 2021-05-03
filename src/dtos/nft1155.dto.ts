export class NFT1155DTO {
  title: string;
  type: string;
  properties: {
    name: string;
    decimals: number;
    description: string;
    image: string;
    properties?: any;
  };
}
