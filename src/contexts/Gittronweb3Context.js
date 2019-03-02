import React, { Component } from 'react';
import GittronWeb3Service from '../util/gittronWeb3';
import Web3Service from '../util/web3Service';

const GittronWeb3Context = React.createContext();

export default class GittronWeb3Provider extends Component {
  contructor(props) {
    super(props);
    this.staet = {
      contract: null,
    };

    this.GittronWeb3Service = new GittronWeb3Service();
    this.web3Service = new Web3Service();

    this.loadContract();
  }

  loadContract = async () => {
    const contract = await this.GittronWeb3Service.initContracts();

    this.setState({ contract });
  };

  render() {
    return (
      <GittronWeb3Context.Provider value={this.state}>
        {this.props.children}
      </GittronWeb3Context.Provider>
    );
  }
}

export const GittronWeb3Consumer = GittronWeb3Context.Consumer;
