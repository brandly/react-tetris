import {
  GameBoard,
  PositionedPiece,
  Piece,
  buildGameBoard,
  addPieceToBoard,
  isEmptyPosition,
  flipClockwise,
  flipCounterclockwise,
  moveDown,
  moveLeft,
  moveRight,
  setPiece,
  hardDrop
} from './board-store';
import AppConstants from '../constants/app-constants';
import * as PieceQueue from '../modules/piece-queue';

export type State = 'PAUSED' | 'PLAYING' | 'LOST';

type HeldPiece = { available: boolean; piece: Piece };

export type Game = {
  state: State;
  board: GameBoard;
  piece: PositionedPiece;
  heldPiece: HeldPiece | undefined;
  queue: PieceQueue.PieceQueue;
  points: number;
  lines: number;
};

type Action =
  | 'PAUSE'
  | 'RESUME'
  | 'TICK'
  | 'HOLD'
  | 'HARD_DROP'
  | 'MOVE_DOWN'
  | 'MOVE_LEFT'
  | 'MOVE_RIGHT'
  | 'FLIP_CLOCKWISE'
  | 'FLIP_COUNTERCLOCKWISE'
  | 'RESET';

export const update = (game: Game, action: Action): Game => {
  switch (action) {
    case 'RESET': {
      return getInitialGame();
    }
    case 'PAUSE': {
      return game.state === 'PLAYING' ? { ...game, state: 'PAUSED' } : game;
    }
    case 'RESUME': {
      return game.state === 'PAUSED' ? { ...game, state: 'PLAYING' } : game;
    }
    case 'HARD_DROP': {
      if (game.state !== 'PLAYING') return game;
      const piece = hardDrop(game.board, game.piece);
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

      // Ensure the held piece will fit on the board
      if (
        game.heldPiece &&
        !isEmptyPosition(game.board, {
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
        piece: { ...game.piece, piece: newPiece },
        queue: newPiece === next.piece ? next.queue : game.queue
      };
    }
  }
};

const lockInPiece = (game: Game): Game => {
  const [board, linesCleared] = setPiece(game.board, game.piece);
  const next = PieceQueue.getNext(game.queue);
  const piece = initializePiece(next.piece);
  return {
    ...game,
    state: isEmptyPosition(board, piece) ? game.state : 'LOST',
    board,
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
  x: AppConstants.GAME_WIDTH / 2 - AppConstants.BLOCK_WIDTH / 2,
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
  move: (
    board: GameBoard,
    piece: PositionedPiece
  ) => PositionedPiece | undefined,
  game: Game
): Game => {
  if (game.state !== 'PLAYING') return game;
  const afterFlip = move(game.board, game.piece);
  return afterFlip ? { ...game, piece: afterFlip } : game;
};

export const getInitialGame = (): Game => {
  const queue = PieceQueue.create(5);
  const next = PieceQueue.getNext(queue);
  return {
    state: 'PLAYING',
    points: 0,
    lines: 0,
    board: buildGameBoard(),
    piece: initializePiece(next.piece),
    heldPiece: undefined,
    queue: next.queue
  };
};

// Good display of merging piece + board
export function viewGameBoard(game: Game): GameBoard {
  let gameBoard = game.board;

  // set the preview
  gameBoard = addPieceToBoard(gameBoard, hardDrop(gameBoard, game.piece), true);

  // set the actual piece
  return addPieceToBoard(gameBoard, game.piece);
}
