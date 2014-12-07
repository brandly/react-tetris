/** @jsx REACT.DOM */
var React = require('react');
var PieceStore = require('../stores/piece-store');
var PieceView = require('./piece-view');
var AppConstants = require('../constants/app-constants');
var states = AppConstants.states;

function piece () {
  return {
    piece: PieceStore.getPieceData().heldPiece
  };
}

var HeldPiece = React.createClass({
  getInitialState: function () {
    return piece();
  },

  componentWillMount: function () {
    PieceStore.addChangeListener(this._onChange);
  },

  _onChange: function () {
    this.setState(piece());
  },

  render: function () {
    return (
      <div>
        <h3>HOLD</h3>
        <PieceView piece={this.state.piece} />
      </div>
    )
  }
});

module.exports = HeldPiece;
