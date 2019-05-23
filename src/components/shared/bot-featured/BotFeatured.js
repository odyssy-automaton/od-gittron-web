import React, { Component } from 'react';

import { GittronWeb3Consumer } from '../../../contexts/Gittronweb3Context';
import { Web3Consumer } from 'web3-react';

import FeaturedBotList from '../featured-bot-list/FeaturedBotList';

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

        <div className="Featured__Intro">
          <h2>Featured Projects</h2>
          <p>
            These bots have been verified by the owner and curated by Gittron. They are worthy of your support!
          </p>

        </div>
        <div>
          <GittronWeb3Consumer>
            {(gtContext) => (
              <Web3Consumer>
                {(w3context) => (
                  <FeaturedBotList
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
