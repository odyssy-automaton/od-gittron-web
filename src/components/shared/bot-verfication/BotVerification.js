import React, { Component, Fragment } from 'react';

import { put } from '../../../util/requests';
import GittronWeb3Service from '../../../util/gittronWeb3';
import Web3Service from '../../../util/web3Service';

import './BotVerification.scss';

class BotVerfication extends Component {
  state = {
    loading: false,
    statusMessage: '',
    ownerOfToken: false,
    contract: null,
  };

  async componentDidMount() {
    this._isMounted = true;
    this.GittronWeb3Service = new GittronWeb3Service(this.props.web3);
    this.web3Service = new Web3Service(this.props.web3);

    this.loadContract();
  }

  loadContract = async () => {
    const contract = await this.GittronWeb3Service.initContracts();

    if (this._isMounted) {
      const ownerOfToken = await this.ownerOf(this.props.bot.tokenId);
      this.setState({ contract, ownerOfToken });
    }
  };

  ownerOf = async (tokenId) => {
    return await this.GittronWeb3Service.ownerOf(tokenId);
  };

  checkRepoOwnership = async () => {
    this.setState({ loading: true });

    const res = await put(`verifyrepo/${this.props.bot.tokenId}`);
    this.setState({ statusMessage: res.data.status, loading: false });

    if (res.data.status === 'verified') {
      this.props.handleVerification();
    }
  };

  render() {
    const { bot, account } = this.props;
    const { loading, statusMessage, ownerOfToken } = this.state;

    return (
      <Fragment>
        {ownerOfToken === account ? (
          <div className="BotVerfication">
            <h5>Your Master Bot is unverified</h5>
            <h6>Verify ownership</h6>
            <p>Repo = {bot.repo}</p>
            <p>
              To enable Worker and Support clones of your Master Bot, you need
              to verify ownership of this repo.
            </p>
            <p>
              To verity you own or manage a repo, create a file in your root
              directory called '.gittron' that contains your public key used to
              register this bot.
            </p>

            {statusMessage === 'unverified' ? (
              <p>
                We're didn't detect the '.gittron' file in your repo. Would you
                like to try again?
              </p>
            ) : null}
            {loading ? (
              <p>loading...</p>
            ) : (
              <button onClick={this.checkRepoOwnership}>Check Ownership</button>
            )}
          </div>
        ) : null}
      </Fragment>
    );
  }
}

export default BotVerfication;
