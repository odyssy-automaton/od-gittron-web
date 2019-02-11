import GitTronAbi from '../../src/contracts/abi.json';
import Web3Service from './web3Service';

export default class GittronWeb3Service {
  web3Service;
  gittronContract;
  constructor(web3) {
    this.web3Service = new Web3Service(web3);
    this.contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
  }
  async initContracts() {
    console.log('abi', GitTronAbi);

    return (this.gittronContract = await this.web3Service.initContract(
      GitTronAbi,
      this.contractAddress,
    ));
  }

  async totalSupply() {
    return await this.gittronContract.methods.totalSupply().call();
  }

  async rigisterMasterBot(tokenUri, tokenId, price, withdrawAddr) {
    console.log('launch token');

    return await this.gittronContract.methods
      .launchBaseToken(tokenUri, tokenId, price, withdrawAddr)
      .send({ from: '0xBaf6e57A3940898fd21076b139D4aB231dCbBc5f' });
  }
}
