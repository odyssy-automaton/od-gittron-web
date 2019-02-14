import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import GittronWeb3Service from '../../../util/gittronWeb3';
import { post } from '../../../util/requests';
import Web3Service from '../../../util/web3Service';

class WithdrawButton extends Component {
  state = {
    contract: null,
    workerTokenId: null,
    tokenId: null,
    botBank: null,
    ownerOf: false,
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

  totalRareAvailible = async (tokenId) => {
    return await this.GittronWeb3Service.allowedToWithdraw(tokenId);
  };

  ownerOf = async (tokenId) => {
    return await this.GittronWeb3Service.ownerOf(tokenId);
  };

  handleSubmit = async (bot) => {
    const newBot = {
      masterTokenId: bot.tokenId,
      tokenType: 'worker',
      address: this.props.account,
    };
    const res = await post('tokens/workersupporter', newBot);
  };

  render() {
    const { bot, account } = this.props;
    const { botBank, ownerOfToken } = this.state;

    return (
      <div>
        <p>Bot bank: {botBank}</p>

        {botBank > 0 && ownerOfToken === account ? (
          <button onClick={() => this.handleSubmit(bot)}>Withdraw</button>
        ) : null}
      </div>
    );
  }
}

export default withRouter(WithdrawButton);
