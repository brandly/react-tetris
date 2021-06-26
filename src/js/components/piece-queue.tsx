import React from 'react';
import { Piece } from '../modules/piece-types';
import PieceStore from '../stores/piece-store';
import PieceView from './piece-view';

type State = Piece[];

function latestQueue(): State {
  return PieceStore.getPieceData().queue;
}

export default function PieceQueue() {
  const [queue, setQueue] = React.useState(latestQueue());

  React.useEffect(() => {
    const onChange = () => {
      setQueue(latestQueue());
    };

    PieceStore.addChangeListener(onChange);
    return () => PieceStore.removeChangeListener(onChange);
  }, []);

  return (
    <div>
      {queue.map((piece, i) => (
        <PieceView piece={piece} key={i} />
      ))}
    </div>
  );
}
