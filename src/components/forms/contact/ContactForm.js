import React from 'react';

import { post } from '../../../util/requests';
import HubspotApi from '../../../util/hubspotApi';

export default class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      walletAddress: '',
      submitted: false,
      inDappPref: true,
      marketingPref: true,
      loading: false,
      error: null,
    };
  }

  handleChange = (e) => {
    console.log(e);
    // this.setState({ [e.target.name]: e.target.value });

    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });

    const body = {
      email: this.state.email,
      walletAddress: this.props.walletAddress,
      inDappPref: this.state.inDappPref,
      marketingPref: this.state.marketingPref,
    };

    const res = await new HubspotApi().addContact(body);

    await post(`bots/email-sign-up`, body);

    if (res.status === 'error') {
      this.setState({
        error: res.errors[0].message,
        loading: false,
      });
    } else {
      this.setState({ submitted: true });
    }
  };

  validForm = () => {
    const emailReg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return emailReg.test(this.state.email);
  };

  render() {
    const { submitted, loading, error } = this.state;
    const { formName } = this.props;

    return (
      <div>
        {submitted ? (
          <div>
            <h5>Email received</h5>
            <p>Thanks!</p>
          </div>
        ) : (
          <form name={formName} onSubmit={this.handleSubmit}>
            {error ? <p>{error}</p> : null}
            <p>
              <label>
                <input
                  type="email"
                  name="email"
                  onChange={this.handleChange}
                  placeholder="Email"
                />
              </label>
            </p>
            <p>contact you about?</p>
            <p>
              <label>
                In Dapp actions?
                <input
                  type="checkbox"
                  name="inDappPref"
                  checked={this.state.inDappPref}
                  onChange={this.handleChange}
                />
              </label>
            </p>
            <p>
              <label>
                Marketing things
                <input
                  type="checkbox"
                  name="marketingPref"
                  checked={this.state.marketingPref}
                  onChange={this.handleChange}
                />
              </label>
            </p>
            <p>
              <button disabled={!this.validForm() || loading} type="submit">
                Sign Up
              </button>
            </p>
          </form>
        )}
      </div>
    );
  }
}
