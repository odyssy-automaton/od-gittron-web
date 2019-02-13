import React, { Component, Fragment } from 'react';
import { Web3Consumer } from 'web3-react';
import { get } from '../../util/requests';
import BotList from '../../components/shared/bot-list/BotList';

import './RepoDetail.scss';

class RepoDetail extends Component {
  state = {
    bots: [],
    masterBot: {},
    supporters: [],
    workers: [],
  };

  componentDidMount = async () => {
    const { data } = await get(`tokens/repo/${this.props.match.params.ghid}`);
    this.setState({
      bots: data,
      masterBot: data.find((bot) => bot.tokenType === 'master'),
      supporters: data.filter((bot) => bot.tokenType === 'supporter'),
      workers: data.filter((bot) => bot.tokenType === 'worker'),
    });
  };

  render() {
    const { bots, masterBot, supporters, workers } = this.state;
    return (
      <Web3Consumer>
        {(context) => (
          <Fragment>
            {
              <div>
                <h2>{masterBot.repo}</h2>
                <h3>{bots.length} total bots</h3>
                <div className="RepoDetail__Lists">
                  <div>
                    <h4>Master bot</h4>
                    <BotList bots={[masterBot]} />
                  </div>
                  <div>
                    <h4>Support bots</h4>
                    <BotList bots={supporters} />
                  </div>
                  <div>
                    <h4>Worker bots</h4>
                    <BotList bots={workers} />
                  </div>
                </div>
              </div>
            }
          </Fragment>
        )}
      </Web3Consumer>
    );
  }
}

export default RepoDetail;
