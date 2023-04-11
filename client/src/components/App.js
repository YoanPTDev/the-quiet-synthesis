import React, { Component } from 'react';
// Cette fonction retourne une fonction
import { connect } from 'react-redux';
import { startGame, cancelGame } from '../actions/settings';
import Adventurelog from './AdventureLog';
import Notebook from './Notebook';
import Map from './Map';
import Card from './Card';
import DrawCard from './DrawCard';

class App extends Component {
  startGame = () => {
    this.props.startGame();
  };

  render() {
    return (
      <div>
        <h1>The Quiet Year</h1>
        {this.props.gameStarted ? (
          <div>
            <h3>Draw!</h3>
            <Map className='map' />
            <button onClick={this.props.cancelGame}>Quit the adventure!</button>
            <div className='log bottom-left component-container'>
              <Adventurelog />
            </div>
            <div className='log bottom-right component-container'>
              <Notebook />
            </div>
            <div className="card-picker top-right component-container">
              <Card />
              <DrawCard />
            </div>
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
