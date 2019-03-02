import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import GenerationForm from '../../forms/generation/GenerationForm';

import { post } from '../../../util/requests';
import Loader from '../loader/loader';

class PrimeGenerator extends Component {
  state = {
    tokenId: null,
    error: null,
  };

  componentDidMount() {
    this._isMounted = true;
    this.web3Service = this.props.gtContext.web3Service;
    this.gittronWeb3Service = this.props.gtContext.gittronWeb3Service;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  registerMasterBot = async (tokenId, price, withdrawAddr) => {
    await this.gittronWeb3Service.rigisterMasterBot(
      tokenId,
      price,
      withdrawAddr,
    );
  };

  tokensByOwner = async (address) => {
    return await this.gittronWeb3Service.tokensByOwner(address);
  };

  handleSubmit = async (bot) => {
    this.setState({
      loading: true,
    });

    const newBot = {
      repo: bot.repo,
      repoOwner: bot.repoOwner,
      address: this.props.account,
      generation: '0',
      generated: false,
    };

    bot.price = await this.web3Service.toWei(bot.price);

    const res = await post('bots/new-prime', newBot);

    if (!res) {
      this.setState({
        error: 'Is that a valid public repo?',
        loading: false,
        tokenId: null,
      });

      return;
    }

    if (res.status !== 200) {
      console.log(res);
      this.setState({
        error: res.data,
        loading: false,
        tokenId: null,
      });

      return;
    }

    this.setState({ tokenId: res.data.tokenId });

    let txRes = {};
    try {
      txRes = await this.gittronWeb3Service.generatePrimeBot(
        `${res.data.tokenId}`,
        bot.price,
        bot.withdrawAddr,
        this.props.account,
      );
    } catch (err) {
      await this.gittronWeb3Service.disableBot(res.data.tokenId);
      txRes.error = err;
    }

    if (txRes.error) {
      this.setState({
        loading: false,
        tokenId: null,
        error: txRes.error.toString(),
      });
    } else {
      this.props.history.push(`/bots/${this.state.tokenId}`);
    }
  };

  render() {
    const { tokenId, error } = this.state;
    const { account } = this.props;

    return (
      <div>
        {tokenId ? (
          <div>
            <p>{tokenId} is generating</p>
            <Loader />
            <img
              src="https://s3.amazonaws.com/odyssy-assets/Gittron__BotCube.svg"
              alt={tokenId}
              height="300px"
            />
          </div>
        ) : (
          <div>
            <p>
              Enter the full URL for a Github repo that you own or manage to
              receive a Gen 0 Prime Bot.
            </p>
            <p>
              Supporters of your repo can donate to your fund of choice and
              they'll get a clone in the form of a Support Bot.
            </p>
            <p>
              Set a price for each Support bot here and an address to receive
              the funds.
            </p>
            <GenerationForm
              error={error}
              account={account}
              onSubmit={this.handleSubmit}
            />
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(PrimeGenerator);
