import {
  GameBoard,
  PositionedPiece,
  Piece,
  buildGameBoard,
  addPieceToBoard,
  isEmptyPosition
} from './board-store';

type State = 'PAUSED' | 'PLAYING' | 'LOST';

type Game = {
  state: State;
  board: GameBoard;
  piece: PositionedPiece | undefined;
  heldPiece: Piece | undefined;
  points: number;
  lines: number;
};

type Action = 'PAUSE' | 'RESUME' | 'TICK' | 'HOLD';

export const update = (game: Game, action: Action): Game => {
  switch (action) {
    case 'PAUSE': {
      return game.state === 'PLAYING' ? { ...game, state: 'PAUSED' } : game;
    }
    case 'RESUME': {
      return game.state === 'PAUSED' ? { ...game, state: 'PLAYING' } : game;
    }
    case 'TICK': {
      // TODO: advance game
      return game;
    }
    // HARD_DROP
    // MOVE_DOWN
    // MOVE_LEFT
    // MOVE_RIGHT
    // FLIP_CLOCKWISE
    // FLIP_COUNTERCLOCKWISE
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

      const newPiece = game.heldPiece ?? setUpNewPiece();

      return {
        ...game,
        heldPiece: game.piece.piece, // hmm
        piece: { ...game.piece, piece: newPiece }
      };
    }
  }
};

export const initialGame: Game = {
  state: 'PLAYING',
  points: 0,
  lines: 0,
  board: buildGameBoard(),
  piece: undefined,
  heldPiece: undefined
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
