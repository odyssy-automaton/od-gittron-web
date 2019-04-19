import React, { Component, Fragment } from 'react';

class GenerationForm extends Component {
  state = {
    valid: true,
    priceError: null,
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

    if (botDetails.price < 0.01 || botDetails.price > 1) {
      this.setState({
        valid: false,
        priceError: 'Set price between .01 and 1',
      });

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

    if(this.props.bot){
      return false;
    }

    const gitStuff = url.split('/');

    return {
      repo: gitStuff[gitStuff.length - 1],
      repoOwner: gitStuff[gitStuff.length - 2],
    };
  };

  render() {
    const { valid, priceError } = this.state;
    const { account, error, bot } = this.props;

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
            {!bot && (
              <div>
                <label>Repo Url</label>
                <input
                  defaultValue=''
                  type="text"
                  name="repoUrl"
                />
              </div>
            )}
              {bot && (<h3>Metamorph</h3>)}

            <div>
              <label>Set Support Price in ETH </label>
              <input
                type="text"
                name="price"
                defaultValue={bot ? bot.botPrice : '.01'}
              />
            </div>
            <div>
              <label>
                Ethereum Wallet Address to receive the Support funds
              </label>
              <input type="text" name="withdrawAddr" defaultValue={account} />
              <p>
                Address Note: This is the account that all funds from support
                bots will withdraw too. We've prepopulated it with your current
                account but funds could be diverted to a bounty, grant or
                multisig.
              </p>
              {bot && (<p>Note on Metamorphing: your current botbank will stay with the old bot you can withdraw it at anytime.</p>)}
            </div>
            <div>
              {error ? <p>* Something went wrong '{error}'</p> : null}
              {priceError ? <p>* '{priceError}'</p> : null}

              <button type="submit">{bot ? 'MORPH' : 'Register Repo'}</button>
            </div>
          </fieldset>
        </form>
      </Fragment>
    );
  }
}

export default GenerationForm;
