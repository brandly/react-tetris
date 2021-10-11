import React from 'react';
import key from 'keymaster';
import Gameboard from './gameboard';
import { update, getInitialGame, State } from '../stores/game-store';
import HeldPiece from './held-piece';
import PieceQueue from './piece-queue';
import { Context } from '../context';
import DetectShift from '../modules/detect-shift';

type RenderFn = (params: {
  HeldPiece: React.ComponentType;
  Gameboard: React.ComponentType;
  PieceQueue: React.ComponentType;
  points: number;
  linesCleared: number;
  state: State;
  reset: () => void;
}) => React.ReactElement;

type Props = {
  children: RenderFn;
};

type KeyboardMap = Record<string, () => void>;

function addKeyboardEvents(keyboardMap: KeyboardMap) {
  Object.keys(keyboardMap).forEach((k: keyof KeyboardMap) => {
    if (k === 'shift') {
      DetectShift.bind(keyboardMap[k]);
    } else {
      key(k, keyboardMap[k]);
    }
  });
}
function removeKeyboardEvents(keyboardMap: KeyboardMap) {
  Object.keys(keyboardMap).forEach((k) => {
    if (k === 'shift') {
      DetectShift.unbind(keyboardMap[k]);
    } else {
      key.unbind(k);
    }
  });
}

export default function Tetris(props: Props): JSX.Element {
  const [game, dispatch] = React.useReducer(update, getInitialGame());

  React.useEffect(() => {
    const keyboardMap: KeyboardMap = {
      down: () => dispatch('MOVE_DOWN'),
      left: () => dispatch('MOVE_LEFT'),
      right: () => dispatch('MOVE_RIGHT'),
      space: () => dispatch('HARD_DROP'),
      z: () => dispatch('FLIP_COUNTERCLOCKWISE'),
      x: () => dispatch('FLIP_CLOCKWISE'),
      up: () => dispatch('FLIP_CLOCKWISE'),
      p: () => {
        if (game.state === 'PLAYING') {
          dispatch('PAUSE');
        } else {
          dispatch('RESUME');
        }
      },
      c: () => dispatch('HOLD'),
      shift: () => dispatch('HOLD')
    };

    addKeyboardEvents(keyboardMap);

    return () => {
      removeKeyboardEvents(keyboardMap);
    };
  }, [game.state]);

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

  const reset = React.useCallback(() => {
    dispatch('RESET');
  }, []);

  console.log(JSON.stringify(game, null, 2));
  return (
    <Context.Provider value={game}>
      {props.children({
        HeldPiece,
        Gameboard,
        PieceQueue,
        points: game.points,
        linesCleared: game.lines,
        state: game.state,
        reset
      })}
    </Context.Provider>
  );
}
