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
    const keyboardDispatch = Object.entries(
      keyboardMap
    ).reduce<KeyboardDispatch>((output, [key, action]) => {
      output[key] = () => dispatch(action);
      return output;
    }, {});
    addKeyboardEvents(keyboardDispatch);
    return () => removeKeyboardEvents(keyboardDispatch);
  }, [keyboardMap, dispatch]);
};

function addKeyboardEvents(keyboardMap: KeyboardDispatch) {
  Object.keys(keyboardMap).forEach((k: keyof KeyboardDispatch) => {
    const fn = keyboardMap[k];
    if (k === 'shift' && fn) {
      DetectShift.bind(fn);
    } else if (fn) {
      key(k, fn);
    }
  });
}
function removeKeyboardEvents(keyboardMap: KeyboardDispatch) {
  Object.keys(keyboardMap).forEach((k) => {
    if (k === 'shift') {
      const fn = keyboardMap[k];
      fn && DetectShift.unbind(fn);
    } else {
      key.unbind(k);
    }
  });
}

type KeyboardDispatch = Record<string, () => void>;
