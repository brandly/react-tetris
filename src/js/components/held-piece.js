import React from 'react';
import PieceStore from '../stores/piece-store';
import PieceView from './piece-view';
import AppConstants from '../constants/app-constants';
const { states } = AppConstants;

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

export default HeldPiece;
