var React = require('react');
var key = require('keymaster');
var AppActions = require('../actions/app-actions');
var GameStore = require('../stores/game-store');
var AppConstants = require('../constants/app-constants');
var states = AppConstants.states;
var DetectShift = require('../modules/detect-shift');

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

  key('p', function () {
    if (GameStore.getCurrentState() === states.PLAYING) {
      AppActions.pause();
    } else {
      AppActions.resume();
    }
  });

  key('c', AppActions.hold);
  DetectShift.bind(AppActions.hold);
}

class Gameboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = gameBoard();
  }

  componentWillMount() {
    GameStore.addChangeListener(this._onChange);
    bindKeyboardEvents();
    GameStore.start();
  }

  _onChange = () => {
    this.setState(gameBoard());
  };

  render() {
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
}

module.exports = Gameboard;
