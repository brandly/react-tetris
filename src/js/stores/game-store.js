var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');
var EventEmitter = require('../modules/event-emitter');
var BoardStore = require('./board-store');
var PieceStore = require('./piece-store');
var pieceSetter = require('../modules/piece-setter');
var _ = require('lodash');
var states = AppConstants.states;
var actions = AppConstants.actions;

var _currentState = null;
var _interval = null;

var GameStore = _.extend({
  getGameBoard: function () {
    var gameBoard = _.cloneDeep(BoardStore.getBoard());
    var pieceData = PieceStore.getPieceData();
    var setter = pieceSetter(gameBoard);

    // set the preview
    setter(pieceData.piece.blocks[pieceData.rotation], pieceData.previewPosition, 'piece-preview');

    // set the actual piece
    setter(pieceData.piece.blocks[pieceData.rotation], pieceData.position, pieceData.piece.className);
    return gameBoard;
  },

  getCurrentState: function () {
    return _currentState;
  },

  start: function () {
    _interval = global.setInterval(function () {
      PieceStore.tick();
    }, 800);
    _currentState = states.PLAYING;
    this.emitChange();
  },

  pause: function () {
    global.clearInterval(_interval);
    _currentState = states.PAUSED;
    this.emitChange();
  },

  dispatcherIndex: AppDispatcher.register(function (payload) {
    var action = payload.action;
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
}, EventEmitter);

// Game store should emit all changes that occur
PieceStore.addChangeListener(function () {
  GameStore.emitChange();
});

BoardStore.addChangeListener(function () {
  GameStore.emitChange();
});

module.exports = GameStore;
