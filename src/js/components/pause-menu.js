/** @jsx REACT.DOM */
var React = require('react');
var Scoreboard = require('./scoreboard');
var Gameboard = require('./gameboard');
var GameStore = require('../stores/game-store');
var AppConstants = require('../constants/app-constants');
var states = AppConstants.states;

function gameState () {
  return {
    gameState: GameStore.getCurrentState()
  };
}

var PauseMenu = React.createClass({
  getInitialState: function () {
    return gameState();
  },

  componentDidMount: function () {
    GameStore.addChangeListener(this._onChange);
  },

  _onChange: function () {
    this.setState(gameState());
  },

  render: function () {
    return (
      <div className="overlay">
        <h1>hi</h1>
      </div>
    )
  }
});

module.exports = PauseMenu;
