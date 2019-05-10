import React, { Component } from 'react';
import { GittronWeb3Consumer } from '../../../contexts/Gittronweb3Context';
import { Web3Consumer } from 'web3-react';

import BotList from '../bot-list/BotList';

import './BotFeatured.scss';

class BotFeatured extends Component {
  state = {};

  withFilters = () => {
    return this.props.bots.filter((bot) => {
      return bot.featured;
    });
  };

  render() {
    const featuredBots = this.withFilters();

    return (
      <div>
        <div>
          <GittronWeb3Consumer>
            {(gtContext) => (
              <Web3Consumer>
                {(w3context) => (
                  <BotList
                    bots={featuredBots}
                    w3context={w3context}
                    context={gtContext}
                  />
                )}
              </Web3Consumer>
            )}
          </GittronWeb3Consumer>
        </div>
      </div>
    );
  }
}

export default BotFeatured;
