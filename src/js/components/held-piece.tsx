import React from 'react';
import { Piece } from '../modules/piece-types';
import PieceStore from '../stores/piece-store';
import PieceView from './piece-view';

type State = {
  piece: Piece | undefined;
};

function latestPiece(): State {
  return {
    piece: PieceStore.getPieceData().heldPiece
  };
}

export default class HeldPiece extends React.Component<{}, State> {
  constructor(props: {}) {
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
