import React from 'react';
import PieceStore from '../stores/piece-store';
import PieceView from './piece-view';

function piece() {
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

  componentWillUnmount() {
    PieceStore.removeChangeListener(this._onChange);
  }

  _onChange = () => {
    this.setState(piece());
  };

  render() {
    return <PieceView piece={this.state.piece} />;
  }
}

export default HeldPiece;
