import React from 'react';
import PieceView from './piece-view';
import { Context } from '../context';

export default function PieceQueue(): JSX.Element {
  const { queue } = React.useContext(Context);
  return (
    <div>
      {queue.queue.map((piece, i) => (
        <PieceView piece={piece} key={i} />
      ))}
    </div>
  );
}
