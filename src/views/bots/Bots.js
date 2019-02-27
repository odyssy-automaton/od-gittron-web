import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { get } from '../../util/requests';
import BotFilter from '../../components/shared/bot-filter/BotFilter';

import './Bots.scss';
import { Web3Consumer } from 'web3-react';

class Bots extends Component {
  state = {
    bots: [],
  };

  componentDidMount = async () => {
    const { data } = await get(`tokens`);
    this.setState({
      bots: data.filter((bot) => !bot.disabled),
    });
  };

  render() {
    const { bots } = this.state;

    return (
      <Web3Consumer>
        {(context) => (
          <div className="Contain">
            {context.active && (
              <div className="Bots__Intro">
                <p>
                  Register your open source project to get an autonomous
                  fundraising Prime Bot.
                </p>
                <Link className="button generate-bot" to="/dashboard">
                  Generate Prime Bot
                </Link>
              </div>
            )}
            {bots ? <BotFilter bots={bots} /> : null}
          </div>
        )}
      </Web3Consumer>
    );
  }
}

export default Bots;
