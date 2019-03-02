import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { post } from '../../../util/requests';
import Loader from '../loader/loader';

class SupportButton extends Component {
  state = {
    price: 0,
    priceInEth: 0,
    contract: null,
    supportTokenId: null,
    tokenId: null,
    loading: false,
  };

  async componentDidMount() {
    this._isMounted = true;

    this.gittronWeb3Service = this.props.gtContext.gittronWeb3Service;
    this.web3Service = this.props.gtContext.web3Service;

    if (this._isMounted) {
      const price = await this.getBaseTokenPrice(this.props.bot.tokenId);
      const priceInEth = await this.web3Service.toEth(price);
      this.setState({ price, priceInEth });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  tokensByOwner = async (address) => {
    return await this.gittronWeb3Service.tokensByOwner(address);
  };

  getBaseTokenPrice = async (tokenId) => {
    return await this.gittronWeb3Service.baseTokenPrice(tokenId);
  };

  handleSubmit = async (bot) => {
    this.setState({
      loading: true,
    });

    const newBot = {
      masterTokenId: bot.tokenId,
      tokenType: 'support',
      address: this.props.account,
    };
    const res = await post('bots/clone', newBot);

    this.setState({ supportTokenId: res.data.tokenId });
    let botRes = {};
    try {
      botRes = await this.gittronWeb3Service.generateSupportBot(
        bot.tokenId,
        res.data.tokenId,
        this.state.price, //amount
        this.props.account, //receiver,
        this.props.account,
      );
    } catch {
      await this.gittronWeb3Service.disableBot(res.data.tokenId);
      botRes = { error: 'tx failure' };
    }

    if (!botRes.error) {
      this.props.history.push(`/bots/${this.state.supportTokenId}`);
    }
    this.setState({ loading: false });
  };

  render() {
    const { bot } = this.props;
    const { priceInEth, loading } = this.state;

    if (loading) {
      return <Loader />;
    }

    return (
      <div>
        <p>Price = {priceInEth} ETH</p>
        <button onClick={() => this.handleSubmit(bot)}>Support</button>
      </div>
    );
  }
}

export default withRouter(SupportButton);
