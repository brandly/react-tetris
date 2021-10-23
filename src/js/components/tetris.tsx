import React from 'react';
import Gameboard from './gameboard';
import { update, getInitialGame, State } from '../stores/game-store';
import HeldPiece from './held-piece';
import PieceQueue from './piece-queue';
import { Context } from '../context';
import { KeyboardMap, useKeyboardControls } from '../hooks/useKeyboardControls';

type RenderFn = (params: {
  HeldPiece: React.ComponentType;
  Gameboard: React.ComponentType;
  PieceQueue: React.ComponentType;
  points: number;
  linesCleared: number;
  state: State;
  controller: Controller;
}) => React.ReactElement;

type Controller = {
  pause: () => void;
  resume: () => void;
  hold: () => void;
  hardDrop: () => void;
  moveDown: () => void;
  moveLeft: () => void;
  moveRight: () => void;
  flipClockwise: () => void;
  flipCounterclockwise: () => void;
  restart: () => void;
};

type Props = {
  keyboardControls?: KeyboardMap;
  children: RenderFn;
};

const defaultKeyboardMap: KeyboardMap = {
  down: 'MOVE_DOWN',
  left: 'MOVE_LEFT',
  right: 'MOVE_RIGHT',
  space: 'HARD_DROP',
  z: 'FLIP_COUNTERCLOCKWISE',
  x: 'FLIP_CLOCKWISE',
  up: 'FLIP_CLOCKWISE',
  // TODO: bring back pause
  // p: 'TOGGLE_PAUSE',
  c: 'HOLD',
  shift: 'HOLD'
};

export default function Tetris(props: Props): JSX.Element {
  const [game, dispatch] = React.useReducer(update, getInitialGame());
  const keyboardMap = props.keyboardControls ?? defaultKeyboardMap;
  useKeyboardControls(keyboardMap, dispatch);

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

  const controller = React.useMemo(
    () => ({
      pause: () => dispatch('PAUSE'),
      resume: () => dispatch('RESUME'),
      hold: () => dispatch('HOLD'),
      hardDrop: () => dispatch('HARD_DROP'),
      moveDown: () => dispatch('MOVE_DOWN'),
      moveLeft: () => dispatch('MOVE_LEFT'),
      moveRight: () => dispatch('MOVE_RIGHT'),
      flipClockwise: () => dispatch('FLIP_CLOCKWISE'),
      flipCounterclockwise: () => dispatch('FLIP_COUNTERCLOCKWISE'),
      restart: () => dispatch('RESTART')
    }),
    [dispatch]
  );

  return (
    <Context.Provider value={game}>
      {props.children({
        HeldPiece,
        Gameboard,
        PieceQueue,
        points: game.points,
        linesCleared: game.lines,
        state: game.state,
        controller
      })}
    </Context.Provider>
  );
}
