import React, { Component } from 'react';
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

  totalSupply = async () => {
    console.log('service');
    console.log(this.GittronWeb3Service);
    console.log('contract', this.state.contract);

    console.log(await this.GittronWeb3Service.totalSupply());
  };

  handleSubmit = async (bot) => {
    const newBot = {
      repo: bot.repo,
      repoOwner: bot.repoOwner,
      tokenType: 'master',
      address: this.props.account,
      generation: '0',
    };

    console.log('newBot', newBot);

    const res = await post('tokens/new', newBot);

    console.log(res);

    var thing = this.GittronWeb3Service.rigisterMasterBot(
      `test/0x${res.data.tokenId}`,
      `0x${res.data.tokenId}`,
      bot.price,
      bot.withdrawAddr,
    );
    console.log('thing', thing);

    this.setState({ tokenId: res.data.tokenId });
  };

  render() {
    const { tokenId } = this.state;

    return (
      <div>
        <div>
          <button onClick={() => this.totalSupply()}>totalSupply</button>
        </div>
        {tokenId ? (
          <div>
            <p>{tokenId} HAS BEEN CREATED</p>
            <img
              src="https://s3.amazonaws.com/odyssy-assets/Gittron__BotCube.png"
              alt={tokenId}
              height="300px"
            />
          </div>
        ) : (
          <GenerationForm onSubmit={this.handleSubmit} />
        )}
      </div>
    );
  }
}

export default Generator;
