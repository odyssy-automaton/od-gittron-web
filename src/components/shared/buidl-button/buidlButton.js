import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import GittronWeb3Service from '../../../util/gittronWeb3';
import { post } from '../../../util/requests';
import Web3Service from '../../../util/web3Service';
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
      const buidlAvail = await this.totalRareAvailible(this.props.bot.tokenId);
      const ownerOfToken = await this.ownerOf(this.props.bot.tokenId);
      this.setState({ contract, buidlAvail, ownerOfToken });
    }
  };

  totalRareAvailible = async (tokenId) => {
    return await this.GittronWeb3Service.totalRareAvailible(tokenId);
  };

  ownerOf = async (tokenId) => {
    return await this.GittronWeb3Service.ownerOf(tokenId);
  };

  handleSubmit = async (bot) => {
    this.setState({ isLoading: true });

    const newBot = {
      masterTokenId: bot.tokenId,
      tokenType: 'buidl',
      address: this.state.toAccount || this.props.account,
    };
    const res = await post('tokens/workersupporter', newBot);

    this.setState({ workerTokenId: res.data.tokenId });

    const botRes = await this.GittronWeb3Service.launchWorkerBot(
      newBot.masterTokenId,
      res.data.tokenId,
      `${process.env.REACT_APP_API_HOST}uri/${res.data.tokenId}`,
      this.state.toAccount || this.props.account, //receiver,
      this.props.account,
      res.data.ghid,
    );

    if (!botRes.error) {
      this.props.history.push(`/bots/${this.state.workerTokenId}`);
    }

    this.setState({ isLoading: false });
  };

  render() {
    const { bot, account } = this.props;
    const { buidlAvail, ownerOfToken, isLoading, toAccount } = this.state;

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
          </div>
        ) : (
          <p>Get more Buidl Bots at next Metamorph Level.</p>
        )}
        {ownerOfToken !== account ? (
          <p>You don't own this Bot.</p>
        ) : null}
      </div>
    );
  }
}

export default withRouter(BuidlButton);
