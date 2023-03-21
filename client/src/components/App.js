import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  startGame,
  cancelGame,
  expandAdventureLog,
  collapseAdventureLog,
} from '../actions/settings';
import Adventurelog from './Adventurelog';
import Map from './Map';

class App extends Component {
  render() {
    return (
      <div>
        <h1>The Quiet Year</h1>
        {this.props.gameStarted ? (
          <div>
            <h3>Draw bitch!</h3>
            <br />
            <Map />
            <br />
            <button onClick={this.props.cancelGame}>Quit the adventure!</button>
          </div>
        ) : (
          <div>
            <h3>A new adventure is on the horizon!</h3>
            <br />
            <button onClick={this.props.startGame}>Go on an adventure!</button>
          </div>
        )}
        <br />
        <Adventurelog />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    gameStarted: state.gameStarted,
  };
};

const componentConnector = connect(mapStateToProps, {
  startGame,
  cancelGame,
  expandAdventureLog,
  collapseAdventureLog,
});

export default componentConnector(App);
