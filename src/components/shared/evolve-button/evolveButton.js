import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import GittronWeb3Service from '../../../util/gittronWeb3';
// import { post } from '../../../util/requests';
import Web3Service from '../../../util/web3Service';

class EvolveButton extends Component {
  state = {
    contract: null,
    tokenId: null,
    evolveAvail: null,
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
      const evolveAvail = await this.canMetaMorph(this.props.bot.tokenId);
      const ownerOfToken = await this.ownerOf(this.props.bot.tokenId);

      this.setState({ contract, evolveAvail, ownerOfToken });
    }
  };

  canMetaMorph = async (tokenId) => {
    return await this.GittronWeb3Service.canMetaMorph(tokenId);
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
    // const res = need to hit a new evolve endpoint

    console.log('newBot', newBot);
  };

  render() {
    const { bot, account } = this.props;
    const { evolveAvail, ownerOfToken } = this.state;

    return (
      <div>
        {evolveAvail && ownerOfToken === account ? (
          <button onClick={() => this.handleSubmit(bot)}>Metamorph</button>
        ) : (
          <p>Metamorph feature is coming soon!</p>
        )}
      </div>
    );
  }
}

export default withRouter(EvolveButton);
