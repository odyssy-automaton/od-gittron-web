// import Web3 from 'web3';

export default class Web3Service {
  web3;
  web3Remote;
  mainAccount;

  constructor(web3) {
    this.web3 = web3;
  }

  async init() {
    this.web3Remote = this.web3;
    this.mainAccount = await this.getMainAccount();
  }

  async getMainAccount() {
    const accounts = await this.web3.eth.getAccounts();
    if (accounts.length === 0) {
      console.log('No accounts.');
    }
    return accounts[0];
  }

  async getAccountBalance(address) {
    return await new this.web3.eth.getBalance(address);
  }

  async initContract(abi, address) {
    return await new this.web3.eth.Contract(abi, address);
  }

  async initContractRemote(abi, address) {
    return await new this.web3Remote.eth.Contract(abi, address);
  }

  async getTransactionStatus(transactionHash) {
    return await this.web3.eth.getTransaction(transactionHash);
  }

  async toWei(amount) {
    return await this.web3.utils.toWei(amount);
  }

  async toEth(amount) {
    return await this.web3.utils.fromWei(amount, 'ether');
  }

  fromAscii(value) {
    return this.web3.utils.fromAscii(value);
  }

  toAscii(value) {
    return this.web3.utils.toAscii(value);
  }

  asciiToHex(value) {
    return this.web3.utils.asciiToHex(value);
  }

  numberToHex(number) {
    return this.eb3.utils.numberToHex(number);
  }
}
