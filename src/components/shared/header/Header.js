import React, { Fragment } from 'react';
import { useWeb3Context } from 'web3-react';

import './Header.scss';

import HeaderLinks from './HeaderLinks';
import FeedbackBar from '../feedback-bar/FeedbackBar';

function Header() {
  const context = useWeb3Context();

  return (
    <Fragment>
      <FeedbackBar />
      <HeaderLinks context={context} />
    </Fragment>
  );
}

export default Header;
