import React from 'react';
import PieceStore from '../stores/piece-store';
import PieceView from './piece-view';

function latestPiece() {
  return {
    piece: PieceStore.getPieceData().heldPiece
  };
}

class HeldPiece extends React.Component {
  constructor(props) {
    super(props);
    this.state = latestPiece();
  }

  componentDidMount() {
    PieceStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    PieceStore.removeChangeListener(this._onChange);
  }

  _onChange = () => {
    this.setState(latestPiece());
  };

  render() {
    const { piece } = this.state;
    return <PieceView piece={piece} />;
  }
}

export default HeldPiece;
