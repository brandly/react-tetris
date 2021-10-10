import React from 'react';
// import key from 'keymaster';
// import AppActions from '../actions/app-actions';
// import GameStore from '../stores/game-store';
// import AppConstants from '../constants/app-constants';
// import DetectShift from '../modules/detect-shift';
import { getClassName } from '../modules/piece-types';
import { Context } from '../context';

// const { states } = AppConstants;

// type KeyboardMap = Record<string, () => void>;
// const keyboardMap: KeyboardMap = {
//   down: AppActions.moveDown,
//   left: AppActions.moveLeft,
//   right: AppActions.moveRight,
//   space: AppActions.hardDrop,
//   z: AppActions.flipCounterclockwise,
//   x: AppActions.flipClockwise,
//   up: AppActions.flipClockwise,
//   p: () => {
//     if (GameStore.getCurrentState() === states.PLAYING) {
//       AppActions.pause();
//     } else {
//       AppActions.resume();
//     }
//   },
//   c: AppActions.hold,
//   shift: AppActions.hold
// };

// function addKeyboardEvents() {
//   Object.keys(keyboardMap).forEach((k: keyof KeyboardMap) => {
//     if (k === 'shift') {
//       DetectShift.bind(keyboardMap[k]);
//     } else {
//       key(k, keyboardMap[k]);
//     }
//   });
// }
// function removeKeyboardEvents() {
//   Object.keys(keyboardMap).forEach((k) => {
//     if (k === 'shift') {
//       DetectShift.unbind(keyboardMap[k]);
//     } else {
//       key.unbind(k);
//     }
//   });
// }

export default function GameboardView(): JSX.Element {
  // React.useEffect(() => {
  //   addKeyboardEvents();

  //   return () => {
  //     removeKeyboardEvents();
  //   };
  // }, []);

  const { board } = React.useContext(Context);

  return (
    <table className="game-board">
      <tbody>
        {board.map((row, i) => {
          const blocksInRow = row.map((block, j) => {
            const classString = `game-block ${
              block ? getClassName(block) : 'block-empty'
            }`;
            return <td key={j} className={classString} />;
          });

          return <tr key={i}>{blocksInRow}</tr>;
        })}
      </tbody>
    </table>
  );
}
