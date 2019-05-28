import React, { Component, Fragment } from 'react';

import { get } from '../../../util/requests';

import ContactForm from '../../forms/contact/ContactForm';

class Contact extends Component {
  state = {
    signedUp: true,
  };

  componentDidMount() {
    this._isMounted = true;

    this.getContact();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
  getContact = async () => {
    if (this._isMounted) {

      const { data } = await get(`contacts/${this.props.address}`);

      if (!data) {
        this.setState({
          signedUp: false,
        });
      }
    }
  };

  handleSignUp = () => {
    this.setState({
      signedUp: true,
    });
  };

  render() {
    const { address } = this.props;
    const { signedUp } = this.state;

    return (
      <Fragment>
        {!signedUp ? (
          <ContactForm address={address} handleSignUp={this.handleSignUp} />
        ) : null}
      </Fragment>
    );
  }
}

export default Contact;
