import _ from 'lodash';
import AppConstants from '../constants/app-constants';
import EventEmitter from '../modules/event-emitter';
import pieceSetter from '../modules/piece-setter';
import { Piece, Rotation, getBlocks } from '../modules/piece-types';

const { events, GAME_HEIGHT, GAME_WIDTH } = AppConstants;

export type Coords = {
  x: number;
  y: number;
};

const serializeCoords = ({ x, y }: Coords): string => `${x},${y}`;

// Two-dimensional array
// First dimension is height. Second is width.
type GameBoard = Array<Array<Piece | null>>;

function buildGameBoard(): GameBoard {
  const board = new Array(GAME_HEIGHT);
  for (let y = 0; y < board.length; y++) {
    board[y] = buildGameRow();
  }
  return board;
}

function buildGameRow(): Array<null> {
  return new Array(GAME_WIDTH).fill(null);
}

const placePiece = (
  board: GameBoard,
  piece: Piece,
  rotation: Rotation,
  position: Coords
): GameBoard => {
  const block = getBlocks(piece)[rotation];

  const filledCells: Array<Coords | false> = block.reduce(
    (output, row, y) =>
      output.concat(
        row.map((cell, x) =>
          cell ? { x: x + position.x, y: y + position.y } : false
        )
      ),
    [] as Array<Coords | false>
  );

  const filled: Set<string> = new Set(
    filledCells
      .map((value) => (value ? serializeCoords(value) : ''))
      .filter(Boolean)
  );

  return board.map((row, y) =>
    row.map((cell, x) => {
      return filled.has(serializeCoords({ x, y })) ? piece : cell;
    })
  );
};

let _gameBoard: GameBoard = buildGameBoard();

class BoardStore extends EventEmitter {
  getBoard(): GameBoard {
    return _gameBoard;
  }

  setPiece(piece: Piece, rotation: Rotation, position: Coords) {
    // _setPiece(getBlocks(piece)[rotation], position, piece.className);
    _gameBoard = placePiece(_gameBoard, piece, rotation, position);
    this.clearFullLines();
    this.emitChange();
  }

  isEmptyPosition(piece: Piece, rotation: Rotation, position: Coords) {
    const blocks = getBlocks(piece)[rotation];

    for (let x = 0; x < AppConstants.BLOCK_WIDTH; x++) {
      for (let y = 0; y < AppConstants.BLOCK_HEIGHT; y++) {
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
  }

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
  }

  emitClearedLines(count) {
    this.emit(events.LINE_CLEARED, count);
  }
}

export default new BoardStore();
