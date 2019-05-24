import React, { Component } from 'react';

import { GittronWeb3Consumer } from '../../../contexts/Gittronweb3Context';
import { Web3Consumer } from 'web3-react';

import FeaturedBotList from '../featured-bot-list/FeaturedBotList';

import './BotFeatured.scss';

class BotFeatured extends Component {
  state = {};

  countSupports = (primeBotId) => {
    return this.props.bots.filter((bot) => bot.tokenType === 'support')
      .filter((bot)=> bot.relatedPrimeBot===primeBotId)
      .length;
  }

  countBuidls = (primeBotId) => {
    return this.props.bots.filter((bot) => bot.tokenType === 'buidl')
      .filter((bot)=> bot.relatedPrimeBot===primeBotId)
      .length;
  }

  firstAncestor = (primeBotId) => {
    let bot = this.props.bots.find((bot)=> bot.tokenId===primeBotId);
    if(bot && bot.relatedAncestorBot){
      return this.firstAncestor(bot.relatedAncestorBot);
    }
    return primeBotId;
  }

  generations = (primeBotId, generations = []) => {
    generations.push(primeBotId);
    let bot = this.props.bots.find((bot)=> bot.tokenId===primeBotId);
    if(bot && bot.relatedChildBot){
      return this.generations(bot.relatedChildBot, generations);
    }

    return generations;
  }

  withFilters = () => {
    return this.props.bots.filter((bot) => {
      return bot.featured;
    }).map((bot) => {

      const fa = this.firstAncestor(bot.tokenId);
      const gens = this.generations(fa);
      const latest = gens[gens.length-1];

      if(bot.tokenId !== latest){
        const newbot = this.props.bots.find((abot)=>abot.tokenId===latest) || bot;
        newbot.featuredTitle = bot.featuredTitle;
        newbot.featuredDesc = bot.featuredDesc;
        bot = newbot
      }
      bot.totalSupports = gens.map((id)=>this.countSupports(id))
        .reduce((total, num)=>total + num);

      bot.supports = this.countSupports(bot.tokenId);
      bot.buidls = this.countBuidls(bot.tokenId);
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
