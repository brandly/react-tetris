import _ from 'lodash';
import AppDispatcher from '../dispatchers/app-dispatcher';
import AppConstants from '../constants/app-constants';
import EventEmitter from '../modules/event-emitter';
import BoardStore from './board-store';
import PieceStore from './piece-store';
import pieceSetter from '../modules/piece-setter';

const { states, actions, events } = AppConstants;

let _currentState = null;
let _interval = null;

const GameStore = _.extend(
  {
    getGameBoard() {
      if (_currentState === states.LOST) {
        return BoardStore.getBoard();
      }
      const gameBoard = _.cloneDeep(BoardStore.getBoard());
      const pieceData = PieceStore.getPieceData();
      const setter = pieceSetter(gameBoard);

      // set the preview
      setter(
        pieceData.piece.blocks[pieceData.rotation],
        pieceData.previewPosition,
        'piece-preview'
      );

      // set the actual piece
      setter(
        pieceData.piece.blocks[pieceData.rotation],
        pieceData.position,
        pieceData.piece.className
      );
      return gameBoard;
    },

    getCurrentState() {
      return _currentState;
    },

    start() {
      if (_currentState !== states.LOST) {
        _interval = global.setInterval(() => {
          PieceStore.tick();
        }, 800);
        _currentState = states.PLAYING;
        this.emitChange();
      }
    },

    pause() {
      if (_currentState === states.PLAYING) {
        global.clearInterval(_interval);
        _currentState = states.PAUSED;
        this.emitChange();
      }
    },

    onLost() {
      global.clearInterval(_interval);
      _currentState = states.LOST;
      this.emitChange();
    },

    dispatcherIndex: AppDispatcher.register((payload) => {
      const { action } = payload;
      switch (action.actionType) {
        case actions.PAUSE:
          GameStore.pause();
          break;

        case actions.RESUME:
          GameStore.start();
          break;
      }

      return true;
    })
  },
  EventEmitter
);

PieceStore.on(events.PLAYER_LOST, () => {
  GameStore.onLost();
});

// Game store should emit all changes that occur
PieceStore.addChangeListener(() => {
  GameStore.emitChange();
});

BoardStore.addChangeListener(() => {
  GameStore.emitChange();
});

export default GameStore;
