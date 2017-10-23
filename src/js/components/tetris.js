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

var Tetris = React.createClass({
  render: function () {
    return this.props.children({
      HeldPiece,
      Scoreboard,
      Gameboard,
      PieceQueue
    });
  }
});

module.exports = Tetris;
