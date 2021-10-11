import React from 'react';
import PieceView from './piece-view';
import { Context } from '../context';

export default function HeldPiece(): JSX.Element {
  const { heldPiece } = React.useContext(Context);
  return <PieceView piece={heldPiece?.piece} />;
}
