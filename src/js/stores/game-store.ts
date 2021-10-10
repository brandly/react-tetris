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
  setPiece
} from './board-store';
import * as PieceQueue from '../modules/piece-queue';

type State = 'PAUSED' | 'PLAYING' | 'LOST';

export type Game = {
  state: State;
  board: GameBoard;
  piece: PositionedPiece | undefined;
  heldPiece: Piece | undefined;
  queue: PieceQueue.PieceQueue;
  points: number;
  lines: number;
};

type Action =
  | 'PAUSE'
  | 'RESUME'
  | 'TICK'
  | 'HOLD'
  | 'MOVE_DOWN'
  | 'MOVE_LEFT'
  | 'MOVE_RIGHT'
  | 'FLIP_CLOCKWISE'
  | 'FLIP_COUNTERCLOCKWISE';

export const update = (game: Game, action: Action): Game => {
  switch (action) {
    case 'PAUSE': {
      return game.state === 'PLAYING' ? { ...game, state: 'PAUSED' } : game;
    }
    case 'RESUME': {
      return game.state === 'PAUSED' ? { ...game, state: 'PLAYING' } : game;
    }
    // case 'HARD_DROP': {
    //   return applyMove(hardDrop, game);
    // }
    case 'TICK':
    case 'MOVE_DOWN': {
      const updated = applyMove(moveDown, game);
      if (game.piece && game.piece === updated.piece) {
        const [board, linesCleared] = setPiece(game.board, game.piece);
        return { ...updated, board, lines: game.lines + linesCleared };
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
      // TODO:
      // if (_hasHeldPiece) return game;
      if (!game.piece) return game;

      // Ensure the held piece will fit on the board
      if (
        game.heldPiece &&
        // game.piece &&
        !isEmptyPosition(game.board, { ...game.piece, piece: game.heldPiece })
      ) {
        return game;
      }

      const next = PieceQueue.getNext(game.queue);
      const newPiece = game.heldPiece ?? next.piece;

      return {
        ...game,
        heldPiece: game.piece.piece, // hmm
        piece: { ...game.piece, piece: newPiece },
        queue: newPiece === next.piece ? next.queue : game.queue
      };
    }
  }
};

const applyMove = (
  move: (
    board: GameBoard,
    piece: PositionedPiece
  ) => PositionedPiece | undefined,
  game: Game
): Game => {
  const afterFlip = game.piece ? move(game.board, game.piece) : game.piece;
  return afterFlip ? { ...game, piece: afterFlip } : game;
};

export const initialGame: Game = {
  state: 'PLAYING',
  points: 0,
  lines: 0,
  board: buildGameBoard(),
  piece: undefined,
  heldPiece: undefined,
  queue: PieceQueue.create(5)
};

// Good display of merging piece + board
export function viewGameBoard(game: Game): GameBoard {
  if (game.state === 'LOST') {
    return game.board;
  }

  let gameBoard = game.board;

  // set the preview
  // if (pieceData.piece) {
  //   gameBoard = placePiece(
  //     gameBoard,
  //     pieceData.piece,
  //     pieceData.rotation,
  //     pieceData.previewPosition,
  //     true
  //   );
  // }

  // set the actual piece
  if (game.piece) {
    gameBoard = addPieceToBoard(gameBoard, game.piece);
  }

  return gameBoard;
}
