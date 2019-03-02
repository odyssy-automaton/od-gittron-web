import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { post } from '../../../util/requests';
import Loader from '../loader/loader';

class BuidlButton extends Component {
  state = {
    contract: null,
    workerTokenId: null,
    tokenId: null,
    buidlAvail: null,
    ownerOf: false,
    isLoading: false,
    toAccount: null,
    error: null,
  };

  async componentDidMount() {
    this._isMounted = true;
    this.gittronWeb3Service = this.props.gtContext.gittronWeb3Service;
    this.web3Service = this.props.gtContext.web3Service;

    if (this._isMounted) {
      const buidlAvail = await this.totalRareAvailible(this.props.bot.tokenId);
      const ownerOfToken = await this.ownerOf(this.props.bot.tokenId);
      this.setState({ buidlAvail, ownerOfToken });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  totalRareAvailible = async (tokenId) => {
    return await this.gittronWeb3Service.totalRareAvailible(tokenId);
  };

  ownerOf = async (tokenId) => {
    return await this.gittronWeb3Service.ownerOf(tokenId);
  };

  handleSubmit = async (bot) => {
    this.setState({ isLoading: true });

    const newBot = {
      masterTokenId: bot.tokenId,
      tokenType: 'buidl',
      address: this.state.toAccount || this.props.account,
    };
    const res = await post('bots/clone', newBot);

    this.setState({ workerTokenId: res.data.tokenId });

    let txRes = null;
    try {
      txRes = await this.gittronWeb3Service.generateBuidlBot(
        newBot.masterTokenId,
        res.data.tokenId,
        this.state.toAccount || this.props.account, //receiver,
        this.props.account,
      );
    } catch (err) {
      await this.gittronWeb3Service.disableBot(res.data.tokenId);
      txRes = { error: 'tx failure' };

      this.setState({ error: err.toString() });
    }

    if (!txRes.error) {
      this.props.history.push(`/bots/${this.state.workerTokenId}`);
    }

    this.setState({ isLoading: false });
  };

  render() {
    const { bot, account } = this.props;
    const { buidlAvail, ownerOfToken, isLoading, error } = this.state;

    return (
      <div>
        <p>{buidlAvail} Buidl Bots available</p>
        {isLoading ? <Loader /> : null}
        {buidlAvail > 0 && ownerOfToken === account && !isLoading ? (
          <div>
            <div className="hideUnlessClicked">
              <label>Send to Address</label>
              <input
                type="text"
                name="toAccount"
                onInput={(e) => this.setState({ toAccount: e.target.value })}
                defaultValue={account}
              />
            </div>
            <button onClick={() => this.handleSubmit(bot)}>
              Gift BuidlBot
            </button>
            {error ? <p>{error}</p> : null}
          </div>
        ) : null}
      </div>
    );
  }
}

export default withRouter(BuidlButton);
