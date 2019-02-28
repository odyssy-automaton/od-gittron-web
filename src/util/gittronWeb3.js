import GitTronAbi from '../../src/contracts/abi.json';
import Web3Service from './web3Service';
import { put } from './requests';
import Web3 from 'web3';

export default class GittronWeb3Service {
  web3Service;
  gittronContract;
  constructor() {
    this.web3 = new Web3(Web3.givenProvider);
    this.web3Service = new Web3Service();
  }

  async initContracts() {
    const network = await this.web3Service.getNetwork();

    if (network === 'main') {
      this.contractAddress = process.env.REACT_APP_MAIN_CONTRACT_ADDRESS;
      this.apiAddress = process.env.REACT_APP_MAIN_API_HOST;
    } else if (network === 'rinkeby') {
      this.contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
      this.apiAddress = process.env.REACT_APP_API_HOST;
    }

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

  async disableBot(tokenId) {
    const disabledUpdate = {
      disabled: true,
    };

    return await put(`bots/update-tx-status/${tokenId}`, disabledUpdate);
  }

  async addTxHash(tokenId, txHash) {
    const txHashUpdate = {
      txHash,
    };

    return await put(`bots/update-tx-status/${tokenId}`, txHashUpdate);
  }

  async updateMined(tokenId) {
    const minedUpdate = {
      mined: true,
    };

    return await put(`bots/update-tx-status/${tokenId}`, minedUpdate);
  }

  async withdraw(baseTokenId, account) {
    return await this.gittronContract.methods
      .withdraw(baseTokenId)
      .send({ from: account })
      .once('transactionHash', async (txHash) => {
        console.log('withdrawing', txHash);
      })
      .then(async (resp) => {
        return resp;
      })
      .catch(async (err) => {
        console.log(err);
        return { error: 'rejected transaction' };
      });
  }

  async generatePrimeBot(tokenId, price, withdrawAddr, account) {
    const tokenUri = `${this.apiAddress}uri/${tokenId}`;

    return await this.gittronContract.methods
      .launchBaseToken(tokenUri, tokenId, price, withdrawAddr)
      .send({ from: account })
      .once('transactionHash', async (txHash) => {
        await this.addTxHash(tokenId, txHash);
      })
      .then(async (resp) => {
        console.log(resp);
        const res = await this.updateMined(tokenId);

        return { success: res };
      })
      .catch(async (err) => {
        console.log('catch', err);
        await this.disableBot(tokenId);

        return { error: 'rejected transaction' };
      });
  }

  async generateBuidlBot(baseTokenId, tokenId, receiver, account) {
    const tokenUri = `${this.apiAddress}uri/${tokenId}`;

    return await this.gittronContract.methods
      .launchRareToken(baseTokenId, tokenId, tokenUri, receiver)
      .send({ from: account })
      .once('transactionHash', async (txHash) => {
        await this.addTxHash(tokenId, txHash);
      })
      .then(async (resp) => {
        console.log(resp);
        const res = await this.updateMined(tokenId);

        return { success: res };
      })
      .catch(async (err) => {
        console.log(err);
        await this.disableBot(tokenId);

        return { error: 'rejected transaction' };
      });
  }

  async generateSupportBot(baseTokenId, tokenId, amount, receiver, account) {
    const tokenUri = `${this.apiAddress}uri/${tokenId}`;

    return await this.gittronContract.methods
      .launchNormalToken(baseTokenId, tokenId, tokenUri, amount, receiver)
      .send({ from: account, value: amount })
      .once('transactionHash', async (txHash) => {
        await this.addTxHash(tokenId, txHash);
      })
      .then(async (resp) => {
        console.log(resp);
        const res = await this.updateMined(tokenId);

        return { success: res };
      })
      .catch(async (err) => {
        console.log(err);
        await this.disableBot(tokenId);

        return { error: 'rejected transaction' };
      });
  }
}
