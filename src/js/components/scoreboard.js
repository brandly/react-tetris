/** @jsx REACT.DOM */
var React = require('react');
var ScoreStore = require('../stores/score-store');

function getScore () {
  return {
    points: ScoreStore.getPoints(),
    linesCleared: ScoreStore.getLinesCleared()
  };
}

var Scoreboard = React.createClass({
  getInitialState: function () {
    return getScore();
  },

  componentWillMount: function () {
    ScoreStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    ScoreStore.removeChangeListener(this._onChange);
  },

  _onChange: function () {
    this.setState(getScore());
  },

  render: function () {
    return (
      <div>
        <p>Points: {this.state.points}</p>
        <p>Lines Cleared: {this.state.linesCleared}</p>
      </div>
    )
  }
});

module.exports = Scoreboard;
