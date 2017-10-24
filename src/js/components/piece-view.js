import React from 'react';
// import PauseMenu from './pause-menu';
import Gameboard from './gameboard';
import GameStore from '../stores/game-store';
import AppConstants from '../constants/app-constants';
const { states } = AppConstants;

function gameState () {
  return {
    gameState: GameStore.getCurrentState()
  };
}

function defaultData () {
  return [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
}

export default class PieceView extends React.Component {
  render() {
    var piece = this.props.piece || defaultData();

    // TODO: make this not a mess
    var blocks;
    if (this.props.piece) {
      blocks = this.props.piece.blocks[0]
    } else {
      blocks = defaultData();
    }

    var self = this;
    var rows = blocks.map(function (row, i) {

      var blocksInRow = row.map(function (block, j) {
        var classString = 'game-block ';

        if (block) {
          classString += self.props.piece.className;
        } else {
          classString += 'block-empty';
        }

        return (
          <td key={j} className={classString}></td>
        );
      });

      return (
        <tr key={i}>
          {blocksInRow}
        </tr>
      );
    });
    return (
      <table className="game-board">
        <tbody>
          {rows}
        </tbody>
      </table>
    )
  }
}
