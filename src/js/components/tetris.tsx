import React from 'react';
import key from 'keymaster';
import Gameboard from './gameboard';
import { update, getInitialGame, State, Action } from '../stores/game-store';
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
  keyboardControls?: KeyboardMap;
  children: RenderFn;
};

type KeyboardMap = Record<string, Action>;

function addKeyboardEvents(keyboardMap: KeyboardDispatch) {
  Object.keys(keyboardMap).forEach((k: keyof KeyboardDispatch) => {
    if (k === 'shift') {
      DetectShift.bind(keyboardMap[k]);
    } else {
      key(k, keyboardMap[k]);
    }
  });
}
function removeKeyboardEvents(keyboardMap: KeyboardDispatch) {
  Object.keys(keyboardMap).forEach((k) => {
    if (k === 'shift') {
      DetectShift.unbind(keyboardMap[k]);
    } else {
      key.unbind(k);
    }
  });
}

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

type KeyboardDispatch = Record<string, () => void>;

const useKeyboardMap = (
  keyboardMap: KeyboardMap,
  dispatch: React.Dispatch<Action>
) => {
  React.useEffect(() => {
    const keyboardDispatch = Object.entries(keyboardMap).reduce(
      (output, [key, action]) => {
        output[key] = () => dispatch(action);
        return output;
      },
      {} as KeyboardDispatch
    );
    addKeyboardEvents(keyboardDispatch);
    return () => removeKeyboardEvents(keyboardDispatch);
  }, [keyboardMap, dispatch]);
};

export default function Tetris(props: Props): JSX.Element {
  const [game, dispatch] = React.useReducer(update, getInitialGame());
  const keyboardMap = props.keyboardControls ?? defaultKeyboardMap;
  useKeyboardMap(keyboardMap, dispatch);

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
