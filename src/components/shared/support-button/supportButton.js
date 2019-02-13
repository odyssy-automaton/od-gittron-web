import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';

import GittronWeb3Service from '../../../util/gittronWeb3';
import { post } from '../../../util/requests';
import Web3Service from '../../../util/web3Service';

class SupportButton extends Component {
  state = {
    price: 0,
    priceInEth: 0,
    contract: null,
    generated: false,
    supportTokenId: null,
    tokenId: null,
  };
  async componentDidMount() {
    this._isMounted = true;
    console.log(this.props.web3);

    this.GittronWeb3Service = new GittronWeb3Service(this.props.web3);
    this.web3Service = new Web3Service(this.props.web3);

    this.loadContract();
    console.log('botz', this.props.bot);
  }

  loadContract = async () => {
    const contract = await this.GittronWeb3Service.initContracts();
    console.log('load contract', contract);

    if (this._isMounted) {
      this.setState({ contract });
      const price = await this.getBaseTokenPrice(this.props.bot.tokenId);
      const priceInEth = await this.web3Service.toEth(price);
      this.setState({ contract, price, priceInEth });
    }
  };

  tokensByOwner = async (address) => {
    return await this.GittronWeb3Service.tokensByOwner(address);
  };

  getBaseTokenPrice = async (tokenId) => {
    return await this.GittronWeb3Service.baseTokenPrice(tokenId);
  };

  handleSubmit = async (bot) => {
    const newBot = {
      masterTokenId: bot.tokenId,
      tokenType: 'supporter',
      address: this.props.account,
    };

    console.log('newBot', newBot);

    const res = await post('tokens/workersupporter', newBot);

    console.log(res);
    this.setState({ supportTokenId: res.data.tokenId });

    var thing = await this.GittronWeb3Service.launchSupportBot(
      bot.tokenId,
      res.data.tokenId,
      `${process.env.REACT_APP_API_HOST}uri/${res.data.tokenId}`,
      this.state.price, //amount
      this.props.account, //receiver,
      this.props.account,
      res.data.ghid,
    );

    console.log('state', this.state);

    this.setState({ generated: true });
  };

  render() {
    const { bot } = this.props;
    const { supportTokenId, generated, priceInEth } = this.state;

    if (generated) {
      return <Redirect to={`${supportTokenId}`} />;
    }

    return (
      <div>
        <p>Price: {priceInEth}</p>
        <button onClick={() => this.handleSubmit(bot)}>Support</button>
      </div>
    );
  }
}

export default SupportButton;
