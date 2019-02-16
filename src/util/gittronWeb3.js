import GitTronAbi from '../../src/contracts/abi.json';
import Web3Service from './web3Service';
import { put, post } from './requests';

export default class GittronWeb3Service {
  web3Service;
  gittronContract;
  constructor(web3) {
    this.web3Service = new Web3Service(web3);
    // this.selectNetowrkContract(web3);
    // this.contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
  }

  async initContracts() {
    const network = await this.web3Service.getNetwork();

    if (network === 'main') {
      this.contractAddress = process.env.REACT_APP_MAIN_CONTRACT_ADDRESS;
    } else if (network === 'rinkeby') {
      this.contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
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

  async checkStatus(txHash, tokenId, ghid) {
    let query = {
      txHash: txHash,
      tokenId: tokenId,
      ghid: ghid,
    };

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
        return resp;
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
    return await this.gittronContract.methods
      .launchBaseToken(tokenUri, tokenId, price, withdrawAddr)
      .send({ from: account })
      .once('transactionHash', async (txHash) => {
        await this.checkStatus(txHash, tokenId, ghid);
      })
      .then(async (resp) => {
        console.log('resp', resp);

        await this.checkStatus(resp.transactionHash, tokenId, ghid);
        const resSvg = await post('generatepng', {
          ghid: ghid,
          tokenId: tokenId,
        });

        return resSvg;
      })
      .catch(async (err) => {
        console.log('catch', err);
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
    return await this.gittronContract.methods
      .launchNormalToken(baseTokenId, tokenId, tokenUri, amount, receiver)
      .send({ from: account, value: amount })
      .once('transactionHash', async (txHash) => {
        await this.checkStatus(txHash, tokenId, ghid);
      })
      .then(async (resp) => {
        await this.checkStatus(resp.transactionHash, tokenId, ghid);
        const resSvg = await post('generatepng', {
          ghid: ghid,
          tokenId: tokenId,
        });

        return resSvg;
      })
      .catch(async (err) => {
        console.log(err);
        await this.checkStatus('rejected', tokenId, ghid);

        return { error: 'rejected transaction' };
      });
  }
}
