import React from 'react';
import PropTypes from 'prop-types';
// import PauseMenu from './pause-menu';

const PieceView = (props) => {
  /* eslint-disable prefer-destructuring */
  const blocks = props.piece.blocks[0];

  const rows = blocks.map((row, i) => {
    const blocksInRow = row.map((block, j) => {
      let classString = 'game-block ';

      if (block) {
        classString += props.piece.className;
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

PieceView.propTypes = {
  piece: PropTypes.shape({
    blocks: PropTypes.arrayOf(
      PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))
    )
  })
};

PieceView.defaultProps = {
  piece: {
    blocks: [
      [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ]
    ]
  }
};

export default PieceView;
