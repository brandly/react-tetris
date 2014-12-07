/** @jsx REACT.DOM */
var React = require('react');
var Scoreboard = require('./scoreboard');
// var PauseMenu = require('./pause-menu');
var Gameboard = require('./gameboard');
var GameStore = require('../stores/game-store');
var HeldPiece = require('./held-piece');
var AppConstants = require('../constants/app-constants');
var states = AppConstants.states;

function gameState () {
  return {
    gameState: GameStore.getCurrentState()
  };
}

var Tetris = React.createClass({
  // getInitialState: function () {
  //   return gameState();
  // },

  // componentWillMount: function () {
  //   GameStore.addChangeListener(this._onChange);
  // },

  // _onChange: function () {
  //   this.setState(gameState());
  // },

  render: function () {
    return (
      <div>
        <Scoreboard />
        <Gameboard />


        <HeldPiece />
      </div>
    )
  }
});

module.exports = Tetris;
