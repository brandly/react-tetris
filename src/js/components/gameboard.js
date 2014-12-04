/** @jsx REACT.DOM */
var React = require('react');
var AppActions = require('../actions/app-actions');
var GameStore = require('../stores/game-store');
var key = require('keymaster');

function gameBoard () {
  return {
    gameBoard: GameStore.getGameBoard()
  };
}

function bindKeyboardEvents () {
  key('down', AppActions.moveDown);
  key('left', AppActions.moveLeft);
  key('right', AppActions.moveRight);
  key('space', AppActions.hardDrop);
  key('z', AppActions.flipCounterclockwise);
  key('x', AppActions.flipClockwise);
  key('up', AppActions.flipClockwise);
}

var Gameboard = React.createClass({
  getInitialState: function () {
    return gameBoard();
  },

  componentWillMount: function () {
    GameStore.addChangeListener(this._onChange);
    bindKeyboardEvents();
    GameStore.start();
  },

  _onChange: function () {
    this.setState(gameBoard());
  },

  render: function () {
    var rows = this.state.gameBoard.map(function (row, i) {

      var blocksInRow = row.map(function (block, j) {
        var classString = 'game-block ' + (block || 'block-empty');
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

module.exports = Gameboard;
