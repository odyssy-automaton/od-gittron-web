import React, { Component } from 'react';

import { GittronWeb3Consumer } from '../../../contexts/Gittronweb3Context';
import { Web3Consumer } from 'web3-react';

import FeaturedBotList from '../featured-bot-list/FeaturedBotList';

import BotHelper from '../../../util/botHelper'

import './BotFeatured.scss';

class BotFeatured extends Component {
  state = {};

  

  withFilters = () => {
    return this.props.bots.filter((bot) => {
      return bot.featured;
    }).map((bot) => {

      const latest = BotHelper.latestBot(bot.tokenId, this.props.bots);

      if(bot.tokenId !== latest){
        const newbot = this.props.bots.find((abot)=>abot.tokenId===latest) || bot;
        newbot.featuredTitle = bot.featuredTitle;
        newbot.featuredDesc = bot.featuredDesc;
        bot = newbot
      }
      bot.totalSupports = BotHelper.totalSupports(bot.tokenId, this.props.bots)
      
      bot.supports = BotHelper.countSupports(bot.tokenId, this.props.bots);
      bot.buidls = BotHelper.countBuidls(bot.tokenId, this.props.bots);
      return bot;
    })
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
