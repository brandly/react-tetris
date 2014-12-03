/** @jsx REACT.DOM */
var React = require('react');
var Tetris = require('./tetris');

var app = React.createClass({
  render: function () {
    return (
      <div>
        <h1>Tetris</h1>
        <Tetris />
      </div>
    )
  }
});

module.exports = app;
