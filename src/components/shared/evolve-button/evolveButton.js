import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import GenerationForm from '../../forms/generation/GenerationForm';
import { post } from '../../../util/requests';

// import { post } from '../../../util/requests';

class EvolveButton extends Component {
  state = {
    contract: null,
    tokenId: null,
    evolveAvail: null,
    hasNotEvolved: null,
    error: null,
    bot: null,
  };
  async componentDidMount() {
    this._isMounted = true;
    this.gittronWeb3Service = this.props.gtContext.gittronWeb3Service;
    this.web3Service = this.props.gtContext.web3Service;

    if (this._isMounted) {
      const evolveAvail = await this.canMetaMorph(this.props.bot.tokenId);
      const hasNotEvolved = await this.hasNotMorphed(this.props.bot.tokenId);
      const ownerOfToken = await this.ownerOf(this.props.bot.tokenId);

      // get the price of the old bot
      const botPrice = await this.getBaseTokenPrice(this.props.bot.tokenId);
      const ethBotPrice = await this.web3Service.toEth(botPrice);
      // get the withdrawAddr of the old bot
      // TODO

      this.props.bot.botPrice = ethBotPrice;

      this.setState({
        hasNotEvolved,
        evolveAvail,
        ownerOfToken,
        bot: this.props.bot,
      });
    }
  }

  getBaseTokenPrice = async (tokenId) => {
    return await this.gittronWeb3Service.baseTokenPrice(tokenId);
  };

  canMetaMorph = async (tokenId) => {
    return await this.gittronWeb3Service.canMetaMorph(tokenId);
  };

  hasNotMorphed = async (tokenId) => {
    return await this.gittronWeb3Service.hasNotMorphed(tokenId);
  };

  ownerOf = async (tokenId) => {
    return await this.gittronWeb3Service.ownerOf(tokenId);
  };

  handleSubmit = async (bot) => {
    console.log('old bot', this.state.bot);
    
    const newBot = {
      address: this.props.account,
      ancestorTokenId: this.state.bot.tokenId,
    };

    console.log('newBot', newBot);

    bot.price = await this.web3Service.toWei(bot.price);

    // use new endpoint
    const res = await post('bots/morph', newBot);
    console.log(res);
    

    if (!res) {
      this.setState({
        error: 'Is that a valid public repo?',
        loading: false,
        tokenId: null,
      });

      return;
    }

    if (res.status !== 200) {
      console.log(res);
      this.setState({
        error: res.data,
        loading: false,
        tokenId: null,
      });

      return;
    }

    this.setState({ tokenId: res.data.tokenId });

    let txRes = {};
    try {
      txRes = await this.gittronWeb3Service.morphPrimeBot(
        this.state.bot.tokenId,
        `${res.data.tokenId}`,
        bot.price,
        bot.withdrawAddr,
        this.props.account,
      );
    } catch (err) {
      await this.gittronWeb3Service.disableBot(res.data.tokenId);
      txRes.error = err;
    }

    if (txRes.error) {
      this.setState({
        loading: false,
        tokenId: null,
        error: txRes.error.toString(),
      });
    } else {
      this.props.history.push(`/bots/${this.state.tokenId}`);
    }
  };

  render() {
    const { account } = this.props;
    const { hasNotEvolved, evolveAvail, ownerOfToken, error, bot } = this.state;

    return (
      <div>
        {evolveAvail && ownerOfToken === account && hasNotEvolved && (
          <Fragment>
            <GenerationForm
              error={error}
              account={account}
              bot={bot}
              onSubmit={this.handleSubmit}
            />
          </Fragment>
        )}

        {!hasNotEvolved && (<p>This bot is disabled and has already morphed!</p>)}
      </div>
    );
  }
}

export default withRouter(EvolveButton);
