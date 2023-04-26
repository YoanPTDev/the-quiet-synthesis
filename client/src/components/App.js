import React, { Component } from 'react';
// Cette fonction retourne une fonction
import { connect } from 'react-redux';
import { startGame, cancelGame } from '../actions/settings';
import Adventurelog from './AdventureLog';
import Notebook from './Notebook';
import Map from './Map';
import Card from './Card';
import TurnActionWrapper from './TurnAction';

class App extends Component {
  render() {
    return (
      <div>
        <h1>The Quiet Year</h1>
        <TurnActionWrapper />
        {this.props.gameStarted ? (
          <div>
            <Map className='map' />
            <button onClick={this.props.cancelGame}>Quit the adventure!</button>
            <div className='log bottom-left component-container'>
              <Adventurelog />
            </div>
            <div className='log bottom-right component-container'>
              <Notebook />
            </div>
            <div className='turn-action top-right component-container'>
              <Card />
            </div>
          </div>
        ) : (
          <div>
            <h3>A new adventure is on the horizon!</h3>
            <br />
            <button onClick={this.props.startGame}>Go on an adventure!</button>
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
