import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import GittronWeb3Service from '../../../util/gittronWeb3';
import { post } from '../../../util/requests';

class SupportButton extends Component {
  state = {
    price: 0,
    contract: null,
    generated: false,
    supportTokenId: null,
    tokenId: null,
  };
  async componentDidMount() {
    this._isMounted = true;
    this.GittronWeb3Service = new GittronWeb3Service(this.props.web3);
    this.loadContract();
  }

  loadContract = async () => {
    const contract = await this.GittronWeb3Service.initContracts();

    if (this._isMounted) {
      this.setState({ contract });
      const price = await this.getBaseTokenPrice(this.props.bot.tokenId);
      this.setState({ contract, price });
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

    this.setState({ generated: true });
  };

  render() {
    const { bot } = this.props;
    const { supportTokenId, generated } = this.state;

    if (generated) {
      return <Redirect to={`${supportTokenId}`} />;
    }

    return (
      <div>
        <p>Price: {this.state.price}</p>
        <button onClick={() => this.handleSubmit(bot)}>Support</button>
      </div>
    );
  }
}

export default SupportButton;
