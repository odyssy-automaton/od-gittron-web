import React, { Component, Fragment } from 'react';
import { Web3Consumer } from 'web3-react';
// import { get } from '../../util/requests';

class RepoDetail extends Component {
  state = {
    repo: {
      repo: 'crockswap',
    },
  };

  // componentDidMount = async () => {
  //   // const { data } = await get(`tokenid/${this.props.match.params.tokenId}`);
  //   // this.setState({
  //   //   bot: data,
  //   // });
  // };

  render() {
    const { repo } = this.state;
    return (
      <Web3Consumer>
        {(context) => (
          <Fragment>
            <h2>{repo.repo}</h2>
          </Fragment>
        )}
      </Web3Consumer>
    );
  }
}

export default RepoDetail;
