import AppConstants from '../constants/app-constants';
import { Piece, Rotation, getBlocks, isRotation } from '../modules/piece-types';

const { GAME_HEIGHT, GAME_WIDTH } = AppConstants;

export { Piece };
export type Coords = {
  x: number;
  y: number;
};

const serializeCoords = ({ x, y }: Coords): string => `${x},${y}`;

// Two-dimensional array
// First dimension is height. Second is width.
export type GameBoard = Array<Array<Piece | 'ghost' | null>>;

export function buildGameBoard(): GameBoard {
  const board = new Array(GAME_HEIGHT);
  for (let y = 0; y < board.length; y++) {
    board[y] = buildGameRow();
  }
  return board;
}

function buildGameRow(): Array<null> {
  return new Array(GAME_WIDTH).fill(null);
}

export const addPieceToBoard = (
  board: GameBoard,
  positionedPiece: PositionedPiece,
  isGhost = false
): GameBoard => {
  const { piece, rotation, position } = positionedPiece;
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

  const value = isGhost ? 'ghost' : piece;

  return board.map((row, y) =>
    row.map((cell, x) => {
      return filled.has(serializeCoords({ x, y })) ? value : cell;
    })
  );
};

export type PositionedPiece = {
  piece: Piece;
  rotation: Rotation;
  position: Coords;
};

export function setPiece(
  board: GameBoard,
  positionedPiece: PositionedPiece
): [GameBoard, number] {
  const _board = addPieceToBoard(board, positionedPiece);
  // TODO: purify
  const linesCleared = clearFullLines(_board);
  return [_board, linesCleared];
}

function clearFullLines(board: GameBoard): number {
  let linesCleared = 0;
  for (let y = 0; y < board.length; y++) {
    // it's a full line
    if (every(board[y])) {
      // so rip it out
      board.splice(y, 1);
      board.unshift(buildGameRow());
      linesCleared += 1;
    }
  }

  return linesCleared;
}

function every<T>(list: T[]): boolean {
  for (let i = 0; i < list.length; i++) {
    if (!list[i]) return false;
  }
  return true;
}

export function isEmptyPosition(
  board: GameBoard,
  positionedPiece: PositionedPiece
): boolean {
  const { piece, rotation, position } = positionedPiece;
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
          if (!board[boardY] || board[boardY][boardX]) {
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

function assert(value: unknown): asserts value {
  if (!value) throw new Error('assertion failed');
}

function tryMove(move: (pp: PositionedPiece) => PositionedPiece) {
  return function (
    gameBoard: GameBoard,
    positionedPiece: PositionedPiece
  ): PositionedPiece | undefined {
    const updatedPiece = move(positionedPiece);

    if (isEmptyPosition(gameBoard, updatedPiece)) {
      return updatedPiece;
    }
  };
}

export const moveLeft = tryMove((positionedPiece: PositionedPiece) => {
  const newPosition = {
    ...positionedPiece.position,
    x: positionedPiece.position.x - 1
  };

  return { ...positionedPiece, position: newPosition };
});

export const moveRight = tryMove((positionedPiece: PositionedPiece) => {
  const newPosition = {
    ...positionedPiece.position,
    x: positionedPiece.position.x + 1
  };

  return { ...positionedPiece, position: newPosition };
});

export const moveDown = tryMove((positionedPiece: PositionedPiece) => {
  const newPosition = {
    ...positionedPiece.position,
    y: positionedPiece.position.y + 1
  };

  return { ...positionedPiece, position: newPosition };
});

export const flipClockwise = tryMove((positionedPiece: PositionedPiece) => {
  const rotation =
    ((positionedPiece.rotation ?? 0) + 1) % AppConstants.ROTATION_COUNT;
  assert(isRotation(rotation));
  return { ...positionedPiece, rotation };
});

export const flipCounterclockwise = tryMove(
  (positionedPiece: PositionedPiece) => {
    let rotation = (positionedPiece.rotation ?? 0) - 1;
    if (rotation < 0) rotation += AppConstants.ROTATION_COUNT;
    assert(isRotation(rotation));
    return { ...positionedPiece, rotation };
  }
);

export function hardDrop(
  gameBoard: GameBoard,
  positionedPiece: PositionedPiece
): PositionedPiece {
  const position = { ...positionedPiece.position };

  while (isEmptyPosition(gameBoard, { ...positionedPiece, position })) {
    position.y += 1;
  }
  // at this point, we just found a non-empty position, so let's step back
  position.y -= 1;
  return { ...positionedPiece, position };
}
