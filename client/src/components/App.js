import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startGame, cancelGame } from '../actions/settings';
import Adventurelog from './Adventurelog';
import Notebook from './Notebook';
import Map from './Map';
import Card from './Card';

class App extends Component {
  startGame = () => {
    this.props.startGame();
    this.props.fetchDeck();
  }

  render() {
    console.log('this', this);

    return (
      <div>
        <h1>The Quiet Year</h1>
        {this.props.gameStarted ? (
          <div>
            <h3>Draw!</h3>
            <br />
            <Map className='map' />
            <br />
            <button onClick={this.props.cancelGame}>Quit the adventure!</button>
            <br/>
            <div className='log'>
              <Adventurelog />
            </div>
            <div className='log'>
              <Notebook />
            </div>
            <br/>
            <Card/>
          </div>
        ) : (
          <div>
            <h3>A new adventure is on the horizon!</h3>
            <br />
            <button onClick={this.startGame}>Go on an adventure!</button>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    gameStarted: state.settings.gameStarted,
  };
};

const componentConnector = connect(mapStateToProps, { startGame, cancelGame });

export default componentConnector(App);
