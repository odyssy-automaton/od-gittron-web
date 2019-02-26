import React, { Component } from 'react';

import { get } from '../../../util/requests';
import GittronWeb3Service from '../../../util/gittronWeb3';
// import BotList from '../bot-list/BotList';
import BotFilter from '../bot-filter/BotFilter';

import './DashboardBots.scss';

class DashboardBots extends Component {
  state = {
    bots: [],
    contract: null,
    tokens: [],
  };

  componentDidMount = async () => {
    this._isMounted = true;
    this.GittronWeb3Service = new GittronWeb3Service();

    this.loadContract();
  };

  loadContract = async () => {
    if (!this.props.authenticated) return;
    const contract = await this.GittronWeb3Service.initContracts();
    const tokens = await this.tokensByOwner(this.props.address);

    const res = await this.loadBots(tokens);

    const bots = res.filter((bot) => bot.data.tokenId).map((bot) => bot.data);

    if (this._isMounted) {
      this.setState({ contract, tokens, bots });
    }
  };

  tokensByOwner = async (address) => {
    if (address) return await this.GittronWeb3Service.tokensByOwner(address);
  };

  pad = (num, size) => {
    let s = String(num);
    s = s.replace('0x', '');

    while (s.length < (size || 2)) {
      s = '0' + s;
    }
    return s;
  };

  loadBots = async (tokens) => {
    const proms = [];
    if (!tokens) return;

    tokens.map((token) => {
      const padded = '0x' + this.pad(token, 32);
      return proms.push(get(`tokenid/${padded}`));
    });

    return await Promise.all(proms);
  };

  render() {
    const { bots } = this.state;

    return (
      <div>
        <div className="DashboardBots">
          {/* <BotList bots={bots} /> */}
          {bots ? <BotFilter bots={bots} /> : null}
        </div>
      </div>
    );
  }
}

export default DashboardBots;
