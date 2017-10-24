import AppDispatcher from '../dispatchers/app-dispatcher';
import AppConstants from '../constants/app-constants';
import EventEmitter from '../modules/event-emitter';
import pieceSetter from '../modules/piece-setter';
import _ from 'lodash';
const { events, states } = AppConstants;

// Two-dimensional array
// First dimension is height. Second is width.
var _gameBoard = (function buildGameBoard () {
  var board = new Array(AppConstants.GAME_HEIGHT);
  for (var y = 0; y < board.length; y++) {
    board[y] = buildGameRow();
  }
  return board;
}());

function buildGameRow () {
  var row = new Array(AppConstants.GAME_WIDTH);
  for (var x = 0; x < row.length; x++) {
    // nothing in it
    row[x] = false;
  }
  return row;
}

var _setPiece = pieceSetter(_gameBoard);

var BoardStore = _.extend({
  getBoard: function () {
    return _gameBoard;
  },

  setPiece: function (piece, rotation, position) {
    _setPiece(piece.blocks[rotation], position, piece.className);
    BoardStore.clearFullLines();
    BoardStore.emitChange();
  },

  isEmptyPosition: function (piece, rotation, position) {
    var blocks = piece.blocks[rotation];

    for (var x = 0; x < piece.blocks[0].length; x++) {
      for (var y = 0; y < piece.blocks[0].length; y++) {
        var block = blocks[y][x];
        var boardX = x + position.x;
        var boardY = y + position.y;

        // might not be filled, ya know
        if (block) {
          // make sure it's on the board
          if (boardX >= 0 && boardX < AppConstants.GAME_WIDTH && boardY < AppConstants.GAME_HEIGHT) {
            // make sure it's available
            if (_gameBoard[boardY][boardX]) {
              // that square is taken by the board already
              return false;
            }
          } else {
            // there's a square in the block that's off the board
            return false;
          }
        }
      }
    }
    return true;
  },

  clearFullLines: function () {
    var linesCleared = 0;
    for (var y = 0; y < _gameBoard.length; y++) {
      // it's a full line
      if (_.every(_gameBoard[y])) {
        // so rip it out
        _gameBoard.splice(y, 1);
        _gameBoard.unshift(buildGameRow());
        linesCleared += 1;
      }
    }

    if (linesCleared) {
      this.emitClearedLines(linesCleared);
    }
  },

  emitClearedLines: function (count) {
    this.emit(events.LINE_CLEARED, count);
  }
}, EventEmitter);

export default BoardStore;
