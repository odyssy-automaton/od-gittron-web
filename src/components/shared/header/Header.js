import React, { Fragment, Component } from 'react';

import './Header.scss';

import HeaderLinks from './HeaderLinks';
import FeedbackBar from '../feedback-bar/FeedbackBar';

const Header = class extends React.Component {
  state = {
    errorOpen: false,
  }

  toggleError = () => {
    this.setState({
      errorOpen: !this.state.errorOpen,
    });
  };

  render () {
    return (
      <Fragment>
        <FeedbackBar />
        <HeaderLinks errorOpen={this.state.errorOpen} toggleError={this.toggleError} />
      </Fragment>
    );
  }
}

export default Header;
