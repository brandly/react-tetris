import React from 'react';
// import PauseMenu from './pause-menu';
// import Gameboard from './gameboard';
import { update, initialGame } from '../stores/game-store';
// import HeldPiece from './held-piece';
// import PieceQueue from './piece-queue';

type RenderFn = (params: {
  // HeldPiece: React.ComponentType;
  // Gameboard: React.ComponentType;
  // PieceQueue: React.ComponentType;
  points: number;
  linesCleared: number;
}) => React.ReactElement;

type Props = {
  children: RenderFn;
};

const Context = React.createContext(initialGame);

// Tetris should be a provider?
export default function Tetris(props: Props) {
  const [game, dispatch] = React.useReducer(update, initialGame);

  React.useEffect(() => {
    let interval: number | undefined;
    if (game.state === 'PLAYING') {
      interval = window.setInterval(() => {
        dispatch('TICK');
      }, 800);
    }

    return () => {
      window.clearInterval(interval);
    };
  }, [game.state]);

  return (
    <Context.Provider value={game}>
      {props.children({
        // HeldPiece,
        // Gameboard,
        // PieceQueue,
        points: game.points,
        linesCleared: game.lines
      })}
    </Context.Provider>
  );
}
