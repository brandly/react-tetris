/** @jsx REACT.DOM */
var React = require('react');
var Scoreboard = require('./scoreboard');
// var PauseMenu = require('./pause-menu');
var Gameboard = require('./gameboard');
var GameStore = require('../stores/game-store');
var AppConstants = require('../constants/app-constants');
var states = AppConstants.states;

function gameState () {
  return {
    gameState: GameStore.getCurrentState()
  };
}

function defaultData () {
  return [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
}

var PieceView = React.createClass({

  render: function () {
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
});

module.exports = PieceView;
