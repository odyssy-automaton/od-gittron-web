import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { get } from '../../util/requests';

import './Home.scss';
import { Web3Consumer } from 'web3-react';
import BotFeatured from '../../components/shared/bot-featured/BotFeatured';

class Home extends Component {
  state = {
    bots: [],
  };

  componentDidMount = async () => {
    this._isMounted = true;

    if (this._isMounted) {
      const { data } = await get(`bots`);
      const bots = data
        .filter((bot) => !bot.disabled)
        .filter((bot) => bot.hatched)
        .sort((botA, botb) => {
          return botA.verified === botb.verified ? 0 : botA.verified ? -1 : 1;
        });
      this.setState({
        bots,
      });
    }
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { bots } = this.state;

    return (
      <div>
        <div className="Hero Columns">
          <div className="Columns__Column--50">
            <h1>Gittron Rulz</h1>
          </div>
          <div className="Columns__Column--50">
            <iframe
              title="G-I-T-T-R-O-N video"
              src="https://player.vimeo.com/video/331858758"
              width="640"
              height="360"
              frameBorder="0"
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          </div>
        </div>
        <Web3Consumer>
          {(context) => (
            <div className="Contain">
              {context.active && (
                <div className="Bots__Intro">
                  <p>
                    Register your open source project (FREE!) to get an
                    autonomous fundraising Prime Bot.
                  </p>
                  <Link className="button generate-bot" to="/dashboard">
                    Generate Prime Bot
                  </Link>
                </div>
              )}

              {bots && <BotFeatured bots={bots} />}
            </div>
          )}
        </Web3Consumer>
        <Link className="button" to="/all">
          View All Bots
        </Link>
      </div>
    );
  }
}

export default Home;
