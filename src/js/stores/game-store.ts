import AppDispatcher from '../dispatchers/app-dispatcher';
import AppConstants from '../constants/app-constants';
import EventEmitter from '../modules/event-emitter';
import BoardStore, { placePiece } from './board-store';
import PieceStore from './piece-store';

type State = 'PAUSED' | 'PLAYING' | 'LOST';

type Game = {
  state: State;
  // board: Board;
  // piece: Piece;
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
  lines: 0
};

//////

// Good display of merging piece + board
// function getGameBoard() {
//   if (_currentState === states.LOST) {
//     return BoardStore.getBoard();
//   }
//   let gameBoard = BoardStore.getBoard();
//   const pieceData = PieceStore.getPieceData();

//   // set the preview
//   if (pieceData.piece) {
//     gameBoard = placePiece(
//       gameBoard,
//       pieceData.piece,
//       pieceData.rotation,
//       pieceData.previewPosition,
//       true
//     );
//   }

//   // set the actual piece
//   if (pieceData.piece) {
//     gameBoard = placePiece(
//       gameBoard,
//       pieceData.piece,
//       pieceData.rotation,
//       pieceData.position
//     );
//   }

//   return gameBoard;
// }
