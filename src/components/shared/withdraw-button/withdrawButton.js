import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import GittronWeb3Service from '../../../util/gittronWeb3';
import Web3Service from '../../../util/web3Service';

import Loader from '../loader/loader';

class WithdrawButton extends Component {
  state = {
    contract: null,
    workerTokenId: null,
    tokenId: null,
    botBank: null,
    ownerOfToken: false,
    withdrawInEth: null,
    isLoading: false,
  };

  async componentDidMount() {
    this._isMounted = true;
    this.GittronWeb3Service = new GittronWeb3Service(this.props.web3);
    this.web3Service = new Web3Service(this.props.web3);

    this.loadContract();
  }

  loadContract = async () => {
    const contract = await this.GittronWeb3Service.initContracts();

    if (this._isMounted) {
      const botBank = await this.allowedToWithdraw(this.props.bot.tokenId);
      const ownerOfToken = await this.ownerOf(this.props.bot.tokenId);
      const withdrawInEth = await this.web3Service.toEth(botBank);
      this.setState({ contract, botBank, ownerOfToken, withdrawInEth });
    }
  };

  allowedToWithdraw = async (tokenId) => {
    return await this.GittronWeb3Service.allowedToWithdraw(tokenId);
  };

  ownerOf = async (tokenId) => {
    return await this.GittronWeb3Service.ownerOf(tokenId);
  };

  handleSubmit = async (bot) => {
    this.setState({ isLoading: true });
    const res = await this.GittronWeb3Service.withdraw(
      bot.tokenId,
      this.props.account,
    );
    if (!res.error) {
      this.setState({ isLoading: false, botBank: 0 });
    } else {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { bot, account } = this.props;
    const { botBank, ownerOfToken, withdrawInEth, isLoading } = this.state;

    return (
      <div>
        <p>Bot bank: {withdrawInEth}</p>
        {isLoading ? <Loader /> : null}

        {botBank > 0 && ownerOfToken === account && !isLoading ? (
          <div>
            <p>20% of withdraw goes to dev fund</p>

            <button onClick={() => this.handleSubmit(bot)}>Withdraw</button>
          </div>
        ) : null}
      </div>
    );
  }
}

export default withRouter(WithdrawButton);
