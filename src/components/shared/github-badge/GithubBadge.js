import React, { Component, Fragment } from 'react';

import './GithubBadge.scss';

class GithubBadge extends Component {
  state = {
    ownerOfToken: false,
    contract: null,
    snippet: null,
  };

  async componentDidMount() {
    this._isMounted = true;
    this.gittronWeb3Service = this.props.gtContext.gittronWeb3Service;
    this.web3Service = this.props.gtContext.web3Service;

    const ownerOfToken = await this.ownerOf(this.props.bot.tokenId);
    const snippet = `<table border="0"><tr>  <td><a href="https://gittron.me/bots/${
      this.props.bot.tokenId
    }"><img src="https://s3.amazonaws.com/od-flat-svg/${
      this.props.bot.tokenId
    }.png" alt="gittron" width="50"/></a></td><td><a href="https://gittron.me/bots/${
      this.props.bot.tokenId
    }">SUPPORT US WITH GITTRON</a></td> <td><a href="https://gittron.me/bots/${
      this.props.bot.tokenId
    }"><img src="https://badgen.net/https/data.gittron.me/dev/bots/supporter-count/${
      this.props.bot.tokenId
      }" alt="support bots" /></a></td></tr></table>`;
    this.setState({ ownerOfToken, snippet});
    
  }

  ownerOf = async (tokenId) => {
    return await this.gittronWeb3Service.ownerOf(tokenId);
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
    const { ownerOfToken, snippet} = this.state;

    return (
      <Fragment>
        {ownerOfToken === account ? (
          <div className="GithubBadge">
            <h4>Add a Support Link to your README!</h4>
            <p>Preview:</p>
            <div
              className="GithubBadge__Preview"
              dangerouslySetInnerHTML={{ __html: snippet }}
            />
            <p>Copy/Paste the following snippet into your README.md</p>
            <textarea readOnly defaultValue={snippet} />
            <button onClick={() => this.copyToClipboard(snippet)}>
              Copy Snippet
            </button>
          </div>
        ) : null}
      </Fragment>
    );
  }
}

export default GithubBadge;
