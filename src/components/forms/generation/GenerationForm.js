import React, { Component } from 'react';

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

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        name="GenerationForm"
        ref={(el) => (this.form = el)}
        autoComplete="off"
      >
        <fieldset>
          <div>
            <label>Repo Name</label>
            <input type="text" name="repo" />
          </div>
          <div>
            <label>Repo Owner</label>
            <input type="text" name="repoOwner" />
          </div>
          <div>
            <button type="submit">Generate Master Bot</button>
          </div>
        </fieldset>
      </form>
    );
  }
}

export default GenerationForm;
