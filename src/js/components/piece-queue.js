/** @jsx REACT.DOM */
var React = require('react');
var PieceStore = require('../stores/piece-store');
var PieceView = require('./piece-view');
var AppConstants = require('../constants/app-constants');
var states = AppConstants.states;

function queue () {
  return {
    queue: PieceStore.getPieceData().queue
  };
}

var PieceQueue = React.createClass({
  getInitialState: function () {
    return queue();
  },

  componentWillMount: function () {
    PieceStore.addChangeListener(this._onChange);
  },

  _onChange: function () {
    this.setState(queue());
  },

  render: function () {
    var pieces = this.state.queue.map(function (piece, i) {
      return (
        <PieceView piece={piece} key={i} />
      );
    });
    return (
      <div>
        <h3>QUEUE</h3>
        {pieces}
      </div>
    )
  }
});

module.exports = PieceQueue;
