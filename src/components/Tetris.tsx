import React from 'react';
import Gameboard from './Gameboard';
import * as Game from '../models/Game';
import HeldPiece from './HeldPiece';
import PieceQueue from './PieceQueue';
import { Context } from '../context';
import { KeyboardMap, useKeyboardControls } from '../hooks/useKeyboardControls';

export type RenderFn = (params: {
  HeldPiece: React.ComponentType;
  Gameboard: React.ComponentType;
  PieceQueue: React.ComponentType;
  points: number;
  linesCleared: number;
  level: number;
  state: Game.State;
  controller: Controller;
}) => React.ReactElement;

export type Controller = {
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
  p: 'TOGGLE_PAUSE',
  c: 'HOLD',
  shift: 'HOLD'
};

// https://harddrop.com/wiki/Tetris_Worlds#Gravity
const tickSeconds = (level: number) =>
  (0.8 - (level - 1) * 0.007) ** (level - 1);

export default function Tetris(props: Props): JSX.Element {
  const [game, dispatch] = React.useReducer(Game.update, Game.init());
  const keyboardMap = props.keyboardControls ?? defaultKeyboardMap;
  useKeyboardControls(keyboardMap, dispatch);
  const level = Game.getLevel(game);

  React.useEffect(() => {
    let interval: number | undefined;
    if (game.state === 'PLAYING') {
      interval = window.setInterval(() => {
        dispatch('TICK');
      }, tickSeconds(level) * 1000);
    }

    return () => {
      window.clearInterval(interval);
    };
  }, [game.state, level]);

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
        level,
        controller
      })}
    </Context.Provider>
  );
}
