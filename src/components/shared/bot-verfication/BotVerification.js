import React, { Component, Fragment } from 'react';

import { put } from '../../../util/requests';

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
    this.gittronWeb3Service = this.props.gtContext.gittronWeb3Service;
    this.web3Service = this.props.gtContext.web3Service;

    if (this._isMounted) {
      const ownerOfToken = await this.ownerOf(this.props.bot.tokenId);
      this.setState({ ownerOfToken });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  ownerOf = async (tokenId) => {
    return await this.gittronWeb3Service.ownerOf(tokenId);
  };

  checkRepoOwnership = async () => {
    this.setState({ loading: true });

    const res = await put(`bots/verify/${this.props.bot.tokenId}`);
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
          <div className="BotVerification Contain">
            <h5>This Prime Bot is not verified.</h5>
            <h3>Verify Ownership</h3>
            <p>Repo = {bot.repo}</p>
            <p>
              To verify you own or manage a repo, create a file in your root
              directory called '.gittron' that contains your public key used to
              register this bot.
            </p>

            {statusMessage === 'unverified' ? (
              <p>
                We didn't detect the '.gittron' file in your repo. Would you
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
