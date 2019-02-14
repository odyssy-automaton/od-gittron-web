import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import GittronWeb3Service from '../../../util/gittronWeb3';
import Web3Service from '../../../util/web3Service';

class WithdrawButton extends Component {
  state = {
    contract: null,
    workerTokenId: null,
    tokenId: null,
    botBank: null,
    ownerOfToken: false,
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
      this.setState({ contract, botBank, ownerOfToken });
    }
  };

  allowedToWithdraw = async (tokenId) => {
    return await this.GittronWeb3Service.allowedToWithdraw(tokenId);
  };

  ownerOf = async (tokenId) => {
    return await this.GittronWeb3Service.ownerOf(tokenId);
  };

  handleSubmit = async (bot) => {
    await this.GittronWeb3Service.withdraw(bot.tokenId, this.props.account);
    this.setState({ botBank: 0 });
  };

  render() {
    const { bot, account } = this.props;
    const { botBank, ownerOfToken } = this.state;

    return (
      <div>
        <p>Bot bank: {botBank}</p>

        {botBank > 0 && ownerOfToken === account ? (
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
