import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
          <p>
            Below is a list of featured bot, they have been verified by the
            owner and curated by Gittron. they are worthy of you support
          </p>
          <Link className="button" to="/filter/all">
            View All Bots Including Ones Not Featured
          </Link>
        </div>
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
