import React from 'react';
import { viewGameBoard } from '../stores/game-store';
import { getClassName } from '../modules/piece-types';
import { Context } from '../context';

export default function GameboardView(): JSX.Element {
  const game = React.useContext(Context);
  const board = viewGameBoard(game);

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
