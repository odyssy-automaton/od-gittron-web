import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import GittronWeb3Service from '../../../util/gittronWeb3';
import { post } from '../../../util/requests';
import Web3Service from '../../../util/web3Service';
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
    this.GittronWeb3Service = new GittronWeb3Service(this.props.web3);
    this.web3Service = new Web3Service(this.props.web3);

    this.loadContract();
  }

  loadContract = async () => {
    const contract = await this.GittronWeb3Service.initContracts();

    if (this._isMounted) {
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
    this.setState({
      loading: true,
    });

    const newBot = {
      masterTokenId: bot.tokenId,
      tokenType: 'support',
      address: this.props.account,
    };
    const res = await post('tokens/workersupporter', newBot);

    this.setState({ supportTokenId: res.data.tokenId });

    await this.GittronWeb3Service.launchSupportBot(
      bot.tokenId,
      res.data.tokenId,
      `${process.env.REACT_APP_API_HOST}uri/${res.data.tokenId}`,
      this.state.price, //amount
      this.props.account, //receiver,
      this.props.account,
      res.data.ghid,
    );

    this.props.history.push(`/bots/${this.state.supportTokenId}`);
  };

  render() {
    const { bot } = this.props;
    const { priceInEth, loading } = this.state;

    if (loading) {
      return <Loader />;
    }

    return (
      <div>
        <p>Price: {priceInEth}</p>
        <button onClick={() => this.handleSubmit(bot)}>Support</button>
      </div>
    );
  }
}

export default withRouter(SupportButton);
