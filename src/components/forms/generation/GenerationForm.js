import React, { Component, Fragment } from 'react';

class GenerationForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const { onSubmit } = this.props;

    const formData = new FormData(this.form);
    const botDetails = {};

    for (let pair of formData.entries()) {
      botDetails[pair[0]] = pair[1];
    }

    onSubmit(botDetails);
    this.form.reset();
  };

  getGitFromUrl(event) {
    // const url = event.target.value;
    // //https://github.com/odyssy-automaton/od-sls-htmlgen.git
    // const gitStuff = url.split('/');
    // const repo = gitStuff[gitStuff.length - 1].split('.')[0];
    // const owner = gitStuff[gitStuff.length - 2];
  }

  render() {
    return (
      <Fragment>
        <form
          onSubmit={this.handleSubmit}
          name="GenerationForm"
          ref={(el) => (this.form = el)}
          autoComplete="off"
        >
          <fieldset>
            <div>
              <label>Repo Name</label>
              <input defaultValue="" type="text" name="repo" />
            </div>
            <div>
              <label>Repo Owner</label>
              <input defaultValue="" type="text" name="repoOwner" />
            </div>
            <div>
              <label>Amount in DAI</label>
              <input
                type="text"
                name="price"
                defaultValue="100000000000000000"
              />
            </div>
            <div>
              <label>Ethereum Wallet Address</label>
              <input type="text" name="withdrawAddr" defaultValue="" />
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
