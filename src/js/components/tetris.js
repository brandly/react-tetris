/** @jsx REACT.DOM */
var React = require('react');
var Scoreboard = require('./scoreboard');
var Gameboard = require('./gameboard');

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
