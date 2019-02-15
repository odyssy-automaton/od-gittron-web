import React, { Component, Fragment } from 'react';

class GenerationForm extends Component {
  state = {
    valid: true,
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.setState({ valid: true });

    const formData = new FormData(this.form);
    const botDetails = {};
    for (let pair of formData.entries()) {
      botDetails[pair[0]] = pair[1];
    }

    if (this.invalidBot(botDetails)) {
      this.setState({ valid: false });

      return;
    }

    this.props.onSubmit({
      ...botDetails,
      ...this.getGitFromUrl(botDetails.repoUrl),
    });

    this.form.reset();
  };

  invalidBot = (bot) => {
    return Object.entries(bot).find((attr) => {
      return !attr[1].length;
    });
  };

  getGitFromUrl = (url) => {
    const gitStuff = url.split('/');

    return {
      repo: gitStuff[gitStuff.length - 1],
      repoOwner: gitStuff[gitStuff.length - 2],
    };
  };

  render() {
    const { valid } = this.state;
    const { account } = this.props;

    return (
      <Fragment>
        {!valid && <p>Invalid submission</p>}
        <form
          onSubmit={this.handleSubmit}
          name="GenerationForm"
          ref={(el) => (this.form = el)}
          autoComplete="off"
        >
          <fieldset>
            <div>
              <label>Repo Url</label>
              <input defaultValue="" type="text" name="repoUrl" />
            </div>
            <div>
              <label>Amount in ETH</label>
              <input type="text" name="price" defaultValue=".01" />
            </div>
            <div>
              <label>Ethereum Wallet Address</label>
              <input type="text" name="withdrawAddr" defaultValue={account} />
              <p>
                Address Note: Tis is the account that all sales from support
                bots will withdraw too. Prepopulated with you current account
                but could be a bounty, grant or multisig.
              </p>
            </div>
            <div>
              <button type="submit">Register Repo</button>
            </div>
          </fieldset>
        </form>
      </Fragment>
    );
  }
}

export default GenerationForm;
