import React from 'react';
import key from 'keymaster';
import DetectShift from '../modules/detect-shift';
import { Action } from '../models/Game';

export type KeyboardMap = Record<string, Action>;

export const useKeyboardControls = (
  keyboardMap: KeyboardMap,
  dispatch: React.Dispatch<Action>
): void => {
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

type KeyboardDispatch = Record<string, () => void>;
