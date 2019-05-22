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
        <div className="Hero Columns">
          <div className="Columns__Column--50">
            <h1>Gittron Rulz</h1>
          </div>
          <div className="Columns__Column--50">
            <iframe title="G-I-T-T-R-O-N video" src="https://player.vimeo.com/video/331858758" width="640" height="360" frameBorder="0" allow="autoplay; fullscreen" allowFullScreen></iframe>
          </div>
        </div>
        <div className="Featured__Intro">
          <h2>Featured Projects</h2>
          <p>
            These bots have been verified by the owner and curated by Gittron. They are worthy of your support!
          </p>
          <Link className="button" to="/filter/all">
            View All Bots
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
