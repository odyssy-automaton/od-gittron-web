import GitTronAbi from '../../src/contracts/abi.json';
import Web3Service from './web3Service';
import { put, post } from './requests';

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

  async registerMasterBot(
    tokenUri,
    tokenId,
    price,
    withdrawAddr,
    account,
    ghid,
  ) {
    console.log('launch token');

    return await this.gittronContract.methods
      .launchBaseToken(tokenUri, tokenId, price, withdrawAddr)
      .send({ from: account })
      .once('transactionHash', async (txHash) => {
        console.log('txHash', txHash);
        let query = {
          txHash: txHash,
          tokenId: tokenId,
          ghid: ghid,
        };
        console.log('query', query);

        const res = await put('tokenstatus', query);
        console.log('res', res);
      })
      .then(async (resp) => {
        console.log('then', resp);
        let query = {
          txHash: resp.transactionHash,
          tokenId: tokenId,
          ghid: ghid,
        };
        console.log('query', query);

        const res = await put('tokenstatus', query);
        console.log('res', res);
        const resSvg = await post('generatepng', {
          ghid: ghid,
          tokenId: tokenId,
        });
        console.log('res svg', resSvg);

        return resSvg;
      });
  }

  // function launchRareToken(
  //   uint _baseTokenId,
  //   uint _tokenId,
  //   string memory _tokenURI,
  //   address receiver
  // )
  async launchWorkerBot(baseTokenId, tokenId, tokenUri, receiver, account) {
    console.log('launch worker token');

    return await this.gittronContract.methods
      .launchRareToken(baseTokenId, tokenId, tokenUri, receiver)
      .send({ from: account })
      .once('transactionHash', (once) => console.log('once', once))
      .then((resp) => console.log('then', resp));
  }

  async launchSupportBot(
    baseTokenId,
    tokenId,
    tokenUri,
    amount,
    receiver,
    account,
  ) {
    console.log('launch support token');

    return await this.gittronContract.methods
      .launchNormalToken(baseTokenId, tokenId, tokenUri, amount, receiver)
      .send({ from: account })
      .once('transactionHash', (once) => console.log('once', once))
      .then((resp) => console.log('then', resp));
  }
}
