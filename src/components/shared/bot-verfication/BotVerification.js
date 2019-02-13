import React, { Component, Fragment } from 'react';

import { put } from '../../../util/requests';

import './BotVerification.scss';

class BotVerfication extends Component {
  state = {
    loading: false,
    statusMessage: '',
  };

  checkOwnership = async () => {
    this.setState({ loading: true });

    const res = await put(`verifyrepo/${this.props.bot.tokenId}`);
    this.setState({ statusMessage: res.data.status, loading: false });

    if (res.data.status === 'verified') {
      this.props.handleVerification();
    }
  };

  render() {
    const { bot } = this.props;
    const { loading, statusMessage } = this.state;

    return (
      <Fragment>
        <div className="BotVerfication">
          <h6>Verify ownership</h6>
          <p>Repo = {bot.repo}</p>
          <p>
            To enable Worker and Support clones of your Master Bot, you need to
            verify ownership of this repo.
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
            <button onClick={this.checkOwnership}>Check Ownership</button>
          )}
        </div>
      </Fragment>
    );
  }
}

export default BotVerfication;
