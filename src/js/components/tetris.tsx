import React from 'react';
// import PauseMenu from './pause-menu';
import Gameboard from './gameboard';
import ScoreStore from '../stores/score-store';
import HeldPiece from './held-piece';
import PieceQueue from './piece-queue';

type RenderFn = (params: {
  HeldPiece: React.ComponentType;
  Gameboard: React.ComponentType;
  PieceQueue: React.ComponentType;
  points: number;
  linesCleared: number;
}) => React.ReactElement;

type Props = {
  children: RenderFn;
};

export default function Tetris({ children }: Props): JSX.Element {
  const [points, setPoints] = React.useState(ScoreStore.getPoints());
  const [linesCleared, setLinesCleared] = React.useState(
    ScoreStore.getLinesCleared()
  );

  React.useEffect(() => {
    const onChange = () => {
      setPoints(ScoreStore.getPoints());
      setLinesCleared(ScoreStore.getLinesCleared());
      return () => ScoreStore.removeChangeListener(onChange);
    };

    ScoreStore.addChangeListener(onChange);
  }, []);

  return children({
    HeldPiece,
    Gameboard,
    PieceQueue,
    points,
    linesCleared
  });
}
