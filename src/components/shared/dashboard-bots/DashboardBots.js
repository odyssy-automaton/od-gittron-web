import React, { Component } from 'react';

import { get } from '../../../util/requests';
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
    this.gittronWeb3Service = this.props.gtContext.gittronWeb3Service;

    this.loadContractData();
  };

  loadContractData = async () => {
    if (!this.props.authenticated) return;

    if (this._isMounted) {
      const tokens = await this.tokensByOwner(this.props.address);
      const res = await this.loadBots(tokens);
      const bots = res.filter((bot) => bot.data.tokenId).map((bot) => bot.data);
      this.setState({ tokens, bots });
    }
  };

  tokensByOwner = async (address) => {
    if (address) return await this.gittronWeb3Service.tokensByOwner(address);
  };

  leftPadHex = (num, size) => {
    let s = String(num);
    s = s.replace('0x', '');

    while (s.length < (size || 2)) {
      s = '0' + s;
    }
    return '0x' + s;
  };

  loadBots = async (tokens) => {
    const proms = [];
    if (!tokens) return;

    tokens.map((token) => {
      const padded = this.leftPadHex(token, 32);
      return proms.push(get(`bots/${padded}`));
    });

    return await Promise.all(proms);
  };

  render() {
    const { bots } = this.state;

    return (
      <div>
        <div className="DashboardBots">
          {bots ? <BotFilter bots={bots} /> : null}
        </div>
      </div>
    );
  }
}

export default DashboardBots;
