import React, { Component, Fragment } from 'react';

import GittronWeb3Service from '../../../util/gittronWeb3';

import './GithubBadge.scss';

class GithubBadge extends Component {
  state = {
    loading: false,
    statusMessage: '',
    ownerOfToken: false,
    contract: null,
    snippet: null,
  };

  async componentDidMount() {
    this._isMounted = true;
    this.GittronWeb3Service = new GittronWeb3Service();

    this.loadContract();
  }

  loadContract = async () => {
    const contract = await this.GittronWeb3Service.initContracts();
    console.log('tid', this.props.bot.tokenId);

    console.log('tid', this.props.bot.tokenId);

    const ownerOfToken = await this.ownerOf(this.props.bot.tokenId);
    const snippet = `<table border="0"><tr>  <td><a href="https://gittron.me/bots/${
      this.props.bot.tokenId
    }"><img  src="https://s3.amazonaws.com/od-flat-svg/${
      this.props.bot.tokenId
    }.png"  alt="gittron"  width="50"/></a></td><td><a href="https://gittron.me/bots/${
      this.props.bot.tokenId
    }">SUPPORT US WITH GITTRON</a></td></tr></table>`;
    this.setState({ contract, ownerOfToken, snippet });
  };

  ownerOf = async (tokenId) => {
    return await this.GittronWeb3Service.ownerOf(tokenId);
  };

  copyToClipboard = (snippet) => {
    var textField = document.createElement('textarea');
    textField.innerText = snippet;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
  };

  render() {
    const { account } = this.props;
    const { ownerOfToken, snippet } = this.state;

    return (
      <Fragment>
        {ownerOfToken === account ? (
          <div className="GitHubBadge Contain">
            <p>Add a gittron snippet to your readme. example:</p>
            <div dangerouslySetInnerHTML={{ __html: snippet }} />
            <p>copy and paste in to github readme</p>
            <textarea readonly>{snippet}</textarea>
            <button onClick={() => this.copyToClipboard(snippet)}>
              copy snippet
            </button>
          </div>
        ) : null}
      </Fragment>
    );
  }
}

export default GithubBadge;
