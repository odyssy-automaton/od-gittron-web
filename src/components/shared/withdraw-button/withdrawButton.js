import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

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
    this.gittronWeb3Service = this.props.gtContext.gittronWeb3Service;
    this.web3Service = this.props.gtContext.web3Service;

    if (this._isMounted) {
      const botBank = await this.allowedToWithdraw(this.props.bot.tokenId);
      const ownerOfToken = await this.ownerOf(this.props.bot.tokenId);
      const withdrawInEth = await this.web3Service.toEth(botBank);
      this.setState({ botBank, ownerOfToken, withdrawInEth });
    }
  }

  allowedToWithdraw = async (tokenId) => {
    return await this.gittronWeb3Service.allowedToWithdraw(tokenId);
  };

  ownerOf = async (tokenId) => {
    return await this.gittronWeb3Service.ownerOf(tokenId);
  };

  handleSubmit = async (bot) => {
    this.setState({ isLoading: true });
    const res = await this.gittronWeb3Service.withdraw(
      bot.tokenId,
      this.props.account,
    );
    if (!res.error) {
      this.setState({ isLoading: false, botBank: 0, withdrawInEth: 0 });
    } else {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { bot, account } = this.props;
    const { botBank, ownerOfToken, withdrawInEth, isLoading } = this.state;

    return (
      <div>
        {isLoading ? <Loader /> : null}
        {botBank === 0 && ownerOfToken === account && !isLoading ? (
          <Fragment>
            <button>Bot Bank = {withdrawInEth} ETH</button>
          </Fragment>
        ) : null}

        {botBank > 0 && ownerOfToken === account && !isLoading ? (
          <Fragment>
            <button onClick={() => this.handleSubmit(bot)}>Withdraw <span className="Price">| {withdrawInEth} ETH</span></button>
          </Fragment>
        ) : null}
      </div>
    );
  }
}

export default withRouter(WithdrawButton);
