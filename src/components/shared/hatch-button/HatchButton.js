import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

import { put } from '../../../util/requests';
import BotLoop from '../../../img/Bot__Loop.gif';
import BotLoopOut from '../../../img/Bot__LoopOut.gif';

import './HatchButton.scss';

class HatchButton extends Component {
  state = {
    contract: null,
    ownerOf: false,
    isLoading: false,
    loopOutplaying: false,
    hatched: false,
    error: null,
  };

  async componentDidMount() {
    this._isMounted = true;

    this.gittronWeb3Service = this.props.gtContext.gittronWeb3Service;
    this.web3Service = this.props.gtContext.web3Service;

    if (this._isMounted) {
      const ownerOfToken = await this.ownerOf(this.props.bot.tokenId);
      this.setState({ ownerOfToken });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  ownerOf = async (tokenId) => {
    return await this.gittronWeb3Service.ownerOf(tokenId);
  };

  handleSubmit = async () => {
    this.setState({ isLoading: true });

    const res = await put(`bots/hatch/${this.props.bot.tokenId}`);

    if (res.data.hash) {
      this.showLoopOut();
      this.setState({ isLoading: false });
    } else {
      this.setState({ isLoading: false, error: res });
    }
  };

  showLoopOut(){
    this.setState( prevState => ({
      loopOutplaying: true
    }));
    
    setTimeout( () => {
      this.setState( prevState => ({
        loopOutplaying: false,
        hatched: true
      }));
      this.props.handleHatch();
      
    }, 2500);
  }

  render() {
    const { ownerOfToken, isLoading, loopOutplaying, hatched, error } = this.state;
    const { account } = this.props;

    if (error) {
      return <p>There was an error while hatching your Bot. Bummer! Sorry about that, please try again.</p>;
    }

    if (isLoading && !loopOutplaying) {
      return <div className="Bot__Loader"><img alt="Bot Hatching" src={BotLoop} /><p>Your Bot is hatching</p></div>;
    }

    if (loopOutplaying){
      return <div className="Bot__Loader"><img alt="Bot Hatched" src={BotLoopOut} /></div>
    }

    return (
      <Fragment>
        {ownerOfToken === account && !isLoading && !hatched ? (
          <div className="HatchButton">
            <button onClick={this.handleSubmit}>Hatch Your Bot</button>
          </div>
        ) : null}
      </Fragment>
    );
  }
}

export default withRouter(HatchButton);
