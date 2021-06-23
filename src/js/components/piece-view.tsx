import React from 'react';
import { getBlocks, getClassName, Piece } from '../modules/piece-types';
// import PauseMenu from './pause-menu';

type Props = {
  piece: Piece;
};

const PieceView: React.FC<Props> = ({ piece }) => {
  // TODO: remove this
  if (!piece) return null;
  /* eslint-disable prefer-destructuring */
  const blocks = getBlocks(piece)[0];

  const rows = blocks.map((row, i) => {
    const blocksInRow = row.map((block, j) => {
      let classString = 'game-block ';

      if (block) {
        classString += getClassName(piece);
      } else {
        classString += 'block-empty';
      }

      return <td key={j} className={classString} />;
    });

    return <tr key={i}>{blocksInRow}</tr>;
  });
  return (
    <table className="piece-view">
      <tbody>{rows}</tbody>
    </table>
  );
};

export default PieceView;
