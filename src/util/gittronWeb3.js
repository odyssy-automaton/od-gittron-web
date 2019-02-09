import GitTronAbi from '../../src/contracts/abi.json';
import Web3Service from './web3Service';

export default class GittronWeb3Service {
  web3Service;
  wanderingContract;
  constructor(web3) {
    this.web3Service = new Web3Service(web3);
    this.contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
  }
  async initContracts() {
    return (this.wanderingContract = await this.web3Service.initContract(
        GitTronAbi.abi,
        this.contractAddress,
    ));
  }
}