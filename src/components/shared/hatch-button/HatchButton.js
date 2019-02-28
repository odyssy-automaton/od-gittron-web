import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

import GittronWeb3Service from '../../../util/gittronWeb3';
import { put } from '../../../util/requests';
import Web3Service from '../../../util/web3Service';

class HatchButton extends Component {
  state = {
    contract: null,
    ownerOf: false,
    isLoading: false,
    error: null,
  };

  async componentDidMount() {
    this._isMounted = true;
    this.GittronWeb3Service = new GittronWeb3Service();
    this.web3Service = new Web3Service();

    this.loadContract();
  }

  componentWillUnmount() {
    this._isMounted = false;
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

  handleSubmit = async () => {
    this.setState({ isLoading: true });

    const res = await put(`bots/hatch/${this.props.bot.tokenId}`);

    if (res.data.hash) {
      this.setState({ isLoading: false });
      this.props.handleHatch();
    } else {
      this.setState({ isLoading: false, error: res });
    }
  };

  render() {
    const { ownerOfToken, isLoading, error } = this.state;
    const { account } = this.props;

    if (error) {
      return <p>There was an error while hatching your bot. Bummer.</p>;
    }

    if (isLoading) {
      return <p>Your bot is hatching</p>;
    }

    return (
      <Fragment>
        {ownerOfToken === account && !isLoading ? (
          <div>
            <button onClick={this.handleSubmit}>Hatch Your Bot</button>
          </div>
        ) : null}
      </Fragment>
    );
  }
}

export default withRouter(HatchButton);
