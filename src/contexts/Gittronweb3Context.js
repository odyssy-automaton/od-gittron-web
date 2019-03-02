import React, { Component } from 'react';

const GittronWeb3Context = React.createContext();

export default class GittronWeb3Provider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contract: props.contract,
      gittronWeb3Service: props.gittronWeb3Service,
      web3Service: props.web3Service,
    };
  }

  render() {
    return (
      <GittronWeb3Context.Provider value={this.state}>
        {this.props.children}
      </GittronWeb3Context.Provider>
    );
  }
}

export const GittronWeb3Consumer = GittronWeb3Context.Consumer;
