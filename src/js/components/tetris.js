/** @jsx REACT.DOM */
var React = require('react');
var Scoreboard = require('./scoreboard');
var Gameboard = require('./gameboard');

// LOOK AT GAMESTORE CURRENT STATE
// PUT A MENU UP AT SOME POINT
var Tetris = React.createClass({
  render: function () {
    return (
      <div>
        <Scoreboard />
        <Gameboard />
      </div>
    )
  }
});

module.exports = Tetris;
