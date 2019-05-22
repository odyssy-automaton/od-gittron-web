import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { get } from '../../util/requests';
import BotFilter from '../../components/shared/bot-filter/BotFilter';

import './Bots.scss';
import { Web3Consumer } from 'web3-react';
import BotFeatured from '../../components/shared/bot-featured/BotFeatured';

class Bots extends Component {
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
    const { filter } = this.props.match.params;

    return (
      <Web3Consumer>
        {(context) => (
          <div className="Contain">
            {context.active && (
              <div className="Bots__Intro">
                <p>
                  Register your open source project (FREE!) to get an autonomous
                  fundraising Prime Bot.
                </p>
                <Link className="button generate-bot" to="/dashboard">
                  Generate Prime Bot
                </Link>
              </div>
            )}

            {bots && !filter && <BotFeatured bots={bots} />}
            {bots && filter === 'all' && <BotFilter bots={bots} />}
          </div>
        )}
      </Web3Consumer>
    );
  }
}

export default Bots;
