import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import GenerationForm from '../../forms/generation/GenerationForm';

import { post } from '../../../util/requests';
import GittronWeb3Service from '../../../util/gittronWeb3';
import Web3Service from '../../../util/web3Service';
import Loader from '../loader/loader';

class Generator extends Component {
  state = {
    tokenId: null,
    error: null,
  };

  componentDidMount() {
    this._isMounted = true;
    this.web3Service = new Web3Service(this.props.web3);

    this.GittronWeb3Service = new GittronWeb3Service(this.props.web3);
    this.loadContract();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  loadContract = async () => {
    const contract = await this.GittronWeb3Service.initContracts();

    if (this._isMounted) {
      this.setState({ contract });
    }
  };

  registerMasterBot = async (tokenId, price, withdrawAddr) => {
    await this.GittronWeb3Service.rigisterMasterBot(
      tokenId,
      price,
      withdrawAddr,
    );
  };

  tokensByOwner = async (address) => {
    return await this.GittronWeb3Service.tokensByOwner(address);
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

    const res = await post('tokens/new', newBot);

    if (!res) {
      console.log(res);
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

    let botRes = {};
    try {
      botRes = await this.GittronWeb3Service.registerMasterBot(
        `${res.data.tokenId}`,
        bot.price,
        bot.withdrawAddr,
        this.props.account,
        res.data.ghid,
      );
    } catch (err) {
      botRes.error = err;
    }

    if (botRes.error) {
      this.setState({
        loading: false,
        tokenId: null,
        error: botRes.error.toString(),
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

export default withRouter(Generator);
