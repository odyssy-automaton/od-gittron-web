import React, { Component } from 'react';

import { get } from '../../../util/requests';
import BotList from '../bot-list/BotList';
import GittronWeb3Service from '../../../util/gittronWeb3';

class DashboardBots extends Component {
  state = {
    bots: [],
    contract: null,
    tokens: [],
  };

  componentDidMount = async () => {
    this._isMounted = true;
    this.GittronWeb3Service = new GittronWeb3Service(this.props.web3);

    this.loadContract();
  };

  loadContract = async () => {
    const contract = await this.GittronWeb3Service.initContracts();
    const tokens = await this.tokensByOwner(this.props.address);
    const res = await this.loadBots(tokens);
    const bots = res.filter((bot) => bot.data.tokenId).map((bot) => bot.data);

    if (this._isMounted) {
      this.setState({ contract, tokens, bots });
    }
  };

  tokensByOwner = async (address) => {
    return await this.GittronWeb3Service.tokensByOwner(address);
  };

  loadBots = async (tokens) => {
    const proms = [];

    tokens.map((token) => {
      return proms.push(get(`tokenid/${token}`));
    });

    return await Promise.all(proms);
  };

  render() {
    const { bots } = this.state;

    return (
      <div>
        <div className="DashboardBots">
          <BotList bots={bots} />
        </div>
      </div>
    );
  }
}

export default DashboardBots;
