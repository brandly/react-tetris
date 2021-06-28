import React from 'react';
import PieceStore from '../stores/piece-store';
import PieceView from './piece-view';

function latestPiece() {
  return PieceStore.getPieceData().heldPiece;
}

export default function HeldPiece(): JSX.Element {
  const [heldPiece, setHeldPiece] = React.useState(latestPiece());

  React.useEffect(() => {
    const onChange = () => {
      setHeldPiece(latestPiece());
    };

    PieceStore.addChangeListener(onChange);
    return () => PieceStore.removeChangeListener(onChange);
  }, []);

  return <PieceView piece={heldPiece} />;
}
