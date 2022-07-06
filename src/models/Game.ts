import {
  Matrix,
  PositionedPiece,
  Piece,
  buildMatrix,
  addPieceToBoard,
  isEmptyPosition,
  flipClockwise,
  flipCounterclockwise,
  moveDown,
  moveLeft,
  moveRight,
  setPiece,
  hardDrop
} from './Matrix';
import Constants from '../constants';
import * as PieceQueue from '../modules/piece-queue';

export type State = 'PAUSED' | 'PLAYING' | 'LOST';

type HeldPiece = { available: boolean; piece: Piece };

export type Game = {
  state: State;
  matrix: Matrix;
  piece: PositionedPiece;
  heldPiece: HeldPiece | undefined;
  queue: PieceQueue.PieceQueue;
  points: number;
  lines: number;
};

export const getLevel = (game: Game): number => Math.floor(game.lines / 10) + 1;

export type Action =
  | 'PAUSE'
  | 'RESUME'
  | 'TOGGLE_PAUSE'
  | 'TICK'
  | 'HOLD'
  | 'HARD_DROP'
  | 'MOVE_DOWN'
  | 'MOVE_LEFT'
  | 'MOVE_RIGHT'
  | 'FLIP_CLOCKWISE'
  | 'FLIP_COUNTERCLOCKWISE'
  | 'RESTART';

export const update = (game: Game, action: Action): Game => {
  switch (action) {
    case 'RESTART': {
      return init();
    }
    case 'PAUSE': {
      return game.state === 'PLAYING' ? { ...game, state: 'PAUSED' } : game;
    }
    case 'RESUME': {
      return game.state === 'PAUSED' ? { ...game, state: 'PLAYING' } : game;
    }
    case 'TOGGLE_PAUSE': {
      if (game.state === 'PLAYING') return { ...game, state: 'PAUSED' };
      if (game.state === 'PAUSED') return { ...game, state: 'PLAYING' };
      return game;
    }
    case 'HARD_DROP': {
      if (game.state !== 'PLAYING') return game;
      const piece = hardDrop(game.matrix, game.piece);
      return lockInPiece({ ...game, piece });
    }
    case 'TICK':
    case 'MOVE_DOWN': {
      if (game.state !== 'PLAYING') return game;
      const updated = applyMove(moveDown, game);
      if (game.piece === updated.piece) {
        return lockInPiece(updated);
      } else {
        return updated;
      }
    }
    case 'MOVE_LEFT': {
      return applyMove(moveLeft, game);
    }
    case 'MOVE_RIGHT': {
      return applyMove(moveRight, game);
    }
    case 'FLIP_CLOCKWISE': {
      return applyMove(flipClockwise, game);
    }
    case 'FLIP_COUNTERCLOCKWISE': {
      return applyMove(flipCounterclockwise, game);
    }
    case 'HOLD': {
      if (game.state !== 'PLAYING') return game;
      if (game.heldPiece && !game.heldPiece.available) return game;

      // Ensure the held piece will fit on the matrix
      if (
        game.heldPiece &&
        !isEmptyPosition(game.matrix, {
          ...game.piece,
          piece: game.heldPiece.piece
        })
      ) {
        return game;
      }

      const next = PieceQueue.getNext(game.queue);
      const newPiece = game.heldPiece?.piece ?? next.piece;

      return {
        ...game,
        heldPiece: { piece: game.piece.piece, available: false }, // hmm
        piece: initializePiece(newPiece),
        queue: newPiece === next.piece ? next.queue : game.queue
      };
    }
    default: {
      const exhaustiveCheck: never = action;
      throw new Error(`Unhandled action: ${exhaustiveCheck}`);
    }
  }
};

const lockInPiece = (game: Game): Game => {
  const [matrix, linesCleared] = setPiece(game.matrix, game.piece);
  const next = PieceQueue.getNext(game.queue);
  const piece = initializePiece(next.piece);
  return {
    ...game,
    state: isEmptyPosition(matrix, piece) ? game.state : 'LOST',
    matrix,
    piece,
    heldPiece: game.heldPiece
      ? { ...game.heldPiece, available: true }
      : undefined,
    queue: next.queue,
    lines: game.lines + linesCleared,
    points: game.points + addScore(linesCleared)
  };
};

const pointsPerLine = 100;
const addScore = (additionalLines: number) => {
  // what's this called?
  if (additionalLines === 4) {
    return pointsPerLine * 10;
  } else {
    return additionalLines * pointsPerLine;
  }
};

const initialPosition = {
  x: Constants.GAME_WIDTH / 2 - Constants.BLOCK_WIDTH / 2,
  y: 0
};

const initializePiece = (piece: Piece): PositionedPiece => {
  return {
    position: initialPosition,
    piece,
    rotation: 0
  };
};

const applyMove = (
  move: (matrix: Matrix, piece: PositionedPiece) => PositionedPiece | undefined,
  game: Game
): Game => {
  if (game.state !== 'PLAYING') return game;
  const afterFlip = move(game.matrix, game.piece);
  return afterFlip ? { ...game, piece: afterFlip } : game;
};

export const init = (): Game => {
  const queue = PieceQueue.create(5);
  const next = PieceQueue.getNext(queue);
  return {
    state: 'PLAYING',
    points: 0,
    lines: 0,
    matrix: buildMatrix(),
    piece: initializePiece(next.piece),
    heldPiece: undefined,
    queue: next.queue
  };
};

// Good display of merging piece + matrix
export function viewMatrix(game: Game): Matrix {
  let gameboard = game.matrix;

  // set the preview
  gameboard = addPieceToBoard(gameboard, hardDrop(gameboard, game.piece), true);

  // set the actual piece
  return addPieceToBoard(gameboard, game.piece);
}
