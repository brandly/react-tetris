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

class HeldPiece extends React.Component {
  constructor(props) {
    super(props);
    this.state = piece();
  }

  componentWillMount() {
    PieceStore.addChangeListener(this._onChange);
  }

  _onChange = () => {
    this.setState(piece());
  };

  render() {
    return (
      <PieceView piece={this.state.piece} />
    )
  }
}

module.exports = HeldPiece;
