import _ from 'lodash';
import AppConstants from '../constants/app-constants';
import EventEmitter from '../modules/event-emitter';
import pieceSetter from '../modules/piece-setter';

const { events, GAME_HEIGHT, GAME_WIDTH } = AppConstants;

// Two-dimensional array
// First dimension is height. Second is width.
const _gameBoard = (function buildGameBoard() {
  const board = new Array(GAME_HEIGHT);
  for (let y = 0; y < board.length; y++) {
    board[y] = buildGameRow();
  }
  return board;
})();

function buildGameRow() {
  const row = new Array(GAME_WIDTH);
  for (let x = 0; x < row.length; x++) {
    // nothing in it
    row[x] = false;
  }
  return row;
}

const _setPiece = pieceSetter(_gameBoard);

const BoardStore = _.extend(
  {
    getBoard() {
      return _gameBoard;
    },

    setPiece(piece, rotation, position) {
      _setPiece(piece.blocks[rotation], position, piece.className);
      BoardStore.clearFullLines();
      BoardStore.emitChange();
    },

    isEmptyPosition(piece, rotation, position) {
      const blocks = piece.blocks[rotation];

      for (let x = 0; x < piece.blocks[0].length; x++) {
        for (let y = 0; y < piece.blocks[0].length; y++) {
          const block = blocks[y][x];
          const boardX = x + position.x;
          const boardY = y + position.y;

          // might not be filled, ya know
          if (block) {
            // make sure it's on the board
            if (boardX >= 0 && boardX < GAME_WIDTH && boardY < GAME_HEIGHT) {
              // make sure it's available
              if (!_gameBoard[boardY] || _gameBoard[boardY][boardX]) {
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

    clearFullLines() {
      let linesCleared = 0;
      for (let y = 0; y < _gameBoard.length; y++) {
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

    emitClearedLines(count) {
      this.emit(events.LINE_CLEARED, count);
    }
  },
  EventEmitter
);

export default BoardStore;
