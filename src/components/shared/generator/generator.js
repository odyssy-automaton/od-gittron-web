import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import GenerationForm from '../../forms/generation/GenerationForm';

import { post } from '../../../util/requests';
import GittronWeb3Service from '../../../util/gittronWeb3';

class Generator extends Component {
  state = {
    tokenId: null,
  };

  componentDidMount() {
    this._isMounted = true;
    console.log('web3 account', this.props.account);

    this.GittronWeb3Service = new GittronWeb3Service(this.props.web3);
    this.loadContract();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  loadContract = async () => {
    const contract = await this.GittronWeb3Service.initContracts();
    console.log('load contract', contract);

    if (this._isMounted) {
      this.setState({ contract });
    }
  };

  registerMasterBot = async (tokenUri, tokenId, price, withdrawAddr) => {
    await this.GittronWeb3Service.rigisterMasterBot(
      tokenUri,
      tokenId,
      price,
      withdrawAddr,
    );
  };

  tokensByOwner = async (address) => {
    return await this.GittronWeb3Service.tokensByOwner(address);
  };

  handleSubmit = async (bot) => {
    const newBot = {
      repo: bot.repo,
      repoOwner: bot.repoOwner,
      tokenType: 'master',
      address: this.props.account,
      generation: '0',
      generated: false,
    };

    console.log('newBot', newBot);

    const res = await post('tokens/new', newBot);

    console.log(res);
    this.setState({ tokenId: res.data.tokenId });

    var thing = await this.GittronWeb3Service.registerMasterBot(
      `${process.env.REACT_APP_API_HOST}uri/${res.data.tokenId}`,
      `${res.data.tokenId}`,
      bot.price,
      bot.withdrawAddr,
      this.props.account,
      res.data.ghid,
    );

    console.log('thing', thing);

    this.setState({ generated: true });
  };

  render() {
    const { tokenId, generated } = this.state;

    if (generated) {
      return <Redirect to={`bots/${tokenId}`} />;
    }

    return (
      <div>
        <div>
          <button onClick={() => this.totalSupply()}>totalSupply</button>
        </div>
        {tokenId ? (
          <div>
            <p>{tokenId} is generating</p>
            <p>LOADING...</p>
            <img
              src="https://s3.amazonaws.com/odyssy-assets/Gittron__BotCube.png"
              alt={tokenId}
              height="300px"
            />
          </div>
        ) : (
          <div>
            <p>
              Enter the clone URL for a Github repo that you own or mangge to
              receive a Gen 0 Master bot-cube.
            </p>
            <p>
              Supporters of your repo can donate to your fund of choice and
              they'll get a clone in the form of a Support Bot.
            </p>
            <p>
              Set a proce for each Support bot here and an address to receive
              the funds.
            </p>
            <GenerationForm onSubmit={this.handleSubmit} />
          </div>
        )}
      </div>
    );
  }
}

export default Generator;
