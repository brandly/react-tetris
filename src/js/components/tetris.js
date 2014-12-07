/** @jsx REACT.DOM */
var React = require('react');
var Scoreboard = require('./scoreboard');
// var PauseMenu = require('./pause-menu');
var Gameboard = require('./gameboard');
var GameStore = require('../stores/game-store');
var HeldPiece = require('./held-piece');
var PieceQueue = require('./piece-queue');
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
      <div className="row">
        <div className="col-md-2">
          <HeldPiece />
          <Scoreboard />
        </div>

        <div className="col-md-4">
          <Gameboard />
        </div>

        <div className="col-md-4">
          <PieceQueue />
        </div>

      </div>
    )
  }
});

module.exports = Tetris;
