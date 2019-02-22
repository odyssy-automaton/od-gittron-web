import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { get } from '../../util/requests';
import BotFilter from '../../components/shared/bot-filter/BotFilter';

import './Bots.scss';
import { AuthConsumer } from '../../contexts/AuthContext';

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
      <AuthConsumer>
        {(authContext) => (
          <div className="Contain">
            {authContext.web3enabled && (
              <Link to="/dashboard">Generate Bot</Link>
            )}
            {bots ? <BotFilter bots={bots} /> : null}
          </div>
        )}
      </AuthConsumer>
    );
  }
}

export default Bots;
