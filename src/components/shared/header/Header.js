import React, { Fragment } from 'react';

import './Header.scss';

import HeaderLinks from './HeaderLinks';
import FeedbackBar from '../feedback-bar/FeedbackBar';

function Header() {
  return (
    <Fragment>
      <FeedbackBar />
      <HeaderLinks />
    </Fragment>
  );
}

export default Header;
