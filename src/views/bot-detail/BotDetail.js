import React, { Component } from 'react';
import { Web3Consumer } from 'web3-react';
import { get } from '../../util/requests';

class BotDetail extends Component {
  state = {
    bot: {},
  };

  componentDidMount = async () => {
    console.log(this.props.match.params);
    const { data } = await get(`tokenid/${this.props.match.params.tokenId}`);

    console.log(data);
    this.setState({
      bot: data,
    });
  };

  render() {
    const { bot } = this.state;
    return (
      <Web3Consumer>
        {(context) => (
          <div>
            <h2>{bot.tokenId}</h2>
            {bot.mined ? (
              <img
                src={bot.tokenUriData.image}
                alt={bot.tokenId}
                height="300px"
              />
            ) : (
              <img
                src="https://s3.amazonaws.com/odyssy-assets/Gittron__BotCube.png"
                alt={bot.tokenId}
                height="300px"
              />
            )}
            <p>{bot.dna}</p>
            <p>{bot.tokenType} bot</p>
            <p>Repo: {bot.repo}</p>
          </div>
        )}
      </Web3Consumer>
    );
  }
}

export default BotDetail;
