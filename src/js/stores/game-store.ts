import {
  GameBoard,
  PositionedPiece,
  buildGameBoard,
  addPieceToBoard
} from './board-store';

type State = 'PAUSED' | 'PLAYING' | 'LOST';

type Game = {
  state: State;
  board: GameBoard;
  piece: PositionedPiece | undefined;
  points: number;
  lines: number;
};

type Action = { type: 'PAUSE' } | { type: 'RESUME' } | { type: 'TICK' };

export const update = (game: Game, action: Action): Game => {
  switch (action.type) {
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
  }
};

export const initialGame: Game = {
  state: 'PLAYING',
  points: 0,
  lines: 0,
  board: buildGameBoard(),
  piece: undefined
};

//////

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
