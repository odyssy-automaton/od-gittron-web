import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import GittronWeb3Service from '../../../util/gittronWeb3';
import { post } from '../../../util/requests';
import Web3Service from '../../../util/web3Service';

class WorkerButton extends Component {
  state = {
    contract: null,
    workerTokenId: null,
    tokenId: null,
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
      this.setState({ contract });
    }
  };

  handleSubmit = async (bot) => {
    const newBot = {
      masterTokenId: bot.tokenId,
      tokenType: 'supporter',
      address: this.props.account,
    };
    const res = await post('tokens/workersupporter', newBot);

    this.setState({ workerTokenId: res.data.tokenId });

    await this.GittronWeb3Service.launchWorkerBot(
      bot.tokenId,
      res.data.tokenId,
      `${process.env.REACT_APP_API_HOST}uri/${res.data.tokenId}`,
      this.props.account, //receiver,
      this.props.account,
      res.data.ghid,
    );

    this.props.history.push(`/bots/${this.state.workerTokenId}`);
  };

  render() {
    const { bot, buidlAvail } = this.props;

    return (
      <div>
        <p>Free buidlbots availible: {buidlAvail}</p>
        <button onClick={() => this.handleSubmit(bot)}>Gift BuidlBot</button>
      </div>
    );
  }
}

export default withRouter(WorkerButton);
