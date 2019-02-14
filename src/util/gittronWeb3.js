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
    return (
      this.gittronContract ||
      (this.gittronContract = await this.web3Service.initContract(
        GitTronAbi,
        this.contractAddress,
      ))
    );
  }

  async totalSupply() {
    return await this.gittronContract.methods.totalSupply().call();
  }

  async totalRareAvailible(baseTokenId) {
    return await this.gittronContract.methods
      .totalRareAvailible(baseTokenId)
      .call();
  }

  async totalWorkers(baseTokenId) {
    return await this.gittronContract.methods.totalRare(baseTokenId).call();
  }

  async totalSupports(baseTokenId) {
    return await this.gittronContract.methods.totalNormal(baseTokenId).call();
  }

  async tokenURI(baseTokenId) {
    return await this.gittronContract.methods.tokenURI(baseTokenId).call();
  }

  async baseTokenPrice(baseTokenId) {
    return await this.gittronContract.methods
      .baseTokenPrice(baseTokenId)
      .call();
  }

  async baseTokenParent(baseTokenId) {
    return await this.gittronContract.methods
      .baseTokenParent(baseTokenId)
      .call();
  }

  async baseTokenLevel(baseTokenId) {
    return await this.gittronContract.methods
      .baseTokenLevel(baseTokenId)
      .call();
  }

  async canMetaMorph(baseTokenId) {
    return await this.gittronContract.methods.canMetaMorph(baseTokenId).call();
  }

  async allowedToWithdraw(baseTokenId) {
    return await this.gittronContract.methods
      .allowedToWithdraw(baseTokenId)
      .call();
  }

  async tokensByOwner(address) {
    let tokens = await this.gittronContract.methods
      .tokensByOwner(address)
      .call();

    return tokens.map((item) => this.web3Service.numberToHex(item));
  }

  async ownerOf(tokenId) {
    return await this.gittronContract.methods.ownerOf(tokenId).call();
  }

  async checkStatus(txHash, tokenId, ghid) {
    let query = {
      txHash: txHash,
      tokenId: tokenId,
      ghid: ghid,
    };
    console.log('query', query);

    return await put('tokenstatus', query);
  }

  async withdraw(baseTokenId, account) {
    return await this.gittronContract.methods
      .withdraw(baseTokenId)
      .send({ from: account })
      .once('transactionHash', async (txHash) => {
        console.log('withdrawing', txHash);
      })
      .then(async (resp) => {
        console.log('withdrawed');
      })
      .catch(async (err) => {
        console.log(err);
        return { error: 'rejected transaction' };
      });
  }

  async metaMorphBot(
    baseTokenId,
    tokenUri,
    tokenId,
    price,
    withdrawAddr,
    account,
    ghid,
  ) {
    return await this.gittronContract.methods
      .metamorph(baseTokenId, tokenUri, tokenId, price, withdrawAddr)
      .send({ from: account })
      .once('transactionHash', async (txHash) => {
        await this.checkStatus(txHash, tokenId, ghid);
      })
      .then(async (resp) => {
        await this.checkStatus(resp.transactionHash, tokenId, ghid);
        const resSvg = await post('generatepng', {
          ghid: ghid,
          tokenId: tokenId,
        });
        console.log('res svg', resSvg);

        return resSvg;
      });
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
        await this.checkStatus(txHash, tokenId, ghid);
      })
      .then(async (resp) => {
        await this.checkStatus(resp.transactionHash, tokenId, ghid);
        const resSvg = await post('generatepng', {
          ghid: ghid,
          tokenId: tokenId,
        });
        console.log('res svg', resSvg);

        return resSvg;
      })
      .catch(async (err) => {
        console.log(err);
        await this.checkStatus('rejected', tokenId, ghid);

        return { error: 'rejected transaction' };
      });
  }

  async launchWorkerBot(
    baseTokenId,
    tokenId,
    tokenUri,
    receiver,
    account,
    ghid,
  ) {
    console.log('launch worker token');

    return await this.gittronContract.methods
      .launchRareToken(baseTokenId, tokenId, tokenUri, receiver)
      .send({ from: account })
      .once('transactionHash', async (txHash) => {
        await this.checkStatus(txHash, tokenId, ghid);
      })
      .then(async (resp) => {
        await this.checkStatus(resp.transactionHash, tokenId, ghid);
        const resSvg = await post('generatepng', {
          ghid: ghid,
          tokenId: tokenId,
        });
        console.log('res svg', resSvg);

        return resSvg;
      })
      .catch(async (err) => {
        console.log(err);
        await this.checkStatus('rejected', tokenId, ghid);

        return { error: 'rejected transaction' };
      });
  }

  async launchSupportBot(
    baseTokenId,
    tokenId,
    tokenUri,
    amount,
    receiver,
    account,
    ghid,
  ) {
    console.log('launch support token');

    return await this.gittronContract.methods
      .launchNormalToken(baseTokenId, tokenId, tokenUri, amount, receiver)
      .send({ from: account, value: amount })
      .once('transactionHash', async (txHash) => {
        await this.checkStatus(txHash, tokenId, ghid);
      })
      .then(async (resp) => {
        await this.checkStatus(resp.transactionHash, tokenId, ghid);
        await post('generatepng', {
          ghid: ghid,
          tokenId: tokenId,
        });
      })
      .catch(async (err) => {
        console.log(err);
        await this.checkStatus('rejected', tokenId, ghid);

        return { error: 'rejected transaction' };
      });
  }
}
