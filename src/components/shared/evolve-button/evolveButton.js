import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// import { post } from '../../../util/requests';

class EvolveButton extends Component {
  state = {
    contract: null,
    tokenId: null,
    evolveAvail: null,
  };
  async componentDidMount() {
    this._isMounted = true;
    this.gittronWeb3Service = this.props.gtContext.gittronWeb3Service;
    this.web3Service = this.props.gtContext.web3Service;

    if (this._isMounted) {
      const evolveAvail = await this.canMetaMorph(this.props.bot.tokenId);
      const ownerOfToken = await this.ownerOf(this.props.bot.tokenId);

      this.setState({ evolveAvail, ownerOfToken });
    }
  }

  canMetaMorph = async (tokenId) => {
    return await this.gittronWeb3Service.canMetaMorph(tokenId);
  };

  ownerOf = async (tokenId) => {
    return await this.gittronWeb3Service.ownerOf(tokenId);
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
