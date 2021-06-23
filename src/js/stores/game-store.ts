import _ from 'lodash';
import AppDispatcher from '../dispatchers/app-dispatcher';
import AppConstants from '../constants/app-constants';
import EventEmitter from '../modules/event-emitter';
import BoardStore, { placePiece } from './board-store';
import PieceStore from './piece-store';

const { states, actions, events } = AppConstants;
type State = 'PAUSED' | 'PLAYING' | 'LOST';

let _currentState: State | null = null;
let _interval: number | null = null;

class GameStore extends EventEmitter {
  dispatcherIndex: string;
  constructor() {
    super();
    this.dispatcherIndex = AppDispatcher.register((payload) => {
      const { action } = payload;
      switch (action.actionType) {
        case actions.PAUSE:
          this.pause();
          break;

        case actions.RESUME:
          this.start();
          break;
      }

      return true;
    });
  }

  getGameBoard() {
    if (_currentState === states.LOST) {
      return BoardStore.getBoard();
    }
    let gameBoard = BoardStore.getBoard();
    const pieceData = PieceStore.getPieceData();

    // set the preview
    gameBoard = placePiece(
      gameBoard,
      pieceData.piece,
      pieceData.rotation,
      pieceData.previewPosition
    );
    // setter(
    //   pieceData.piece.blocks[pieceData.rotation],
    //   pieceData.previewPosition,
    //   'piece-preview'
    // );

    // set the actual piece
    gameBoard = placePiece(
      gameBoard,
      pieceData.piece,
      pieceData.rotation,
      pieceData.position
    );
    // setter(
    //   pieceData.piece.blocks[pieceData.rotation],
    //   pieceData.position,
    //   pieceData.piece.className
    // );
    return gameBoard;
  }

  getCurrentState() {
    return _currentState;
  }

  start() {
    if (_currentState !== states.LOST) {
      _interval = window.setInterval(() => {
        PieceStore.tick();
      }, 800);
      _currentState = 'PLAYING';
      this.emitChange();
    }
  }

  pause() {
    if (_currentState === states.PLAYING) {
      _interval && window.clearInterval(_interval);
      _currentState = 'PAUSED';
      this.emitChange();
    }
  }

  onLost() {
    _interval && window.clearInterval(_interval);
    _currentState = 'LOST';
    this.emitChange();
  }
}

const store = new GameStore();

PieceStore.on(events.PLAYER_LOST, () => {
  store.onLost();
});

// Game store should emit all changes that occur
PieceStore.addChangeListener(() => {
  store.emitChange();
});

BoardStore.addChangeListener(() => {
  store.emitChange();
});

export default store;
