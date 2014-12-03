var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');
var EventEmitter = require('./event-emitter');
var BoardStore = require('./board-store');
var PieceStore = require('./piece-store');
var pieceSetter = require('./piece-setter');
var _ = require('lodash');
var states = AppConstants.states;

var _currentState = null;

var GameStore = _.extend({
  getGameBoard: function () {
    var gameBoard = _.cloneDeep(BoardStore.getBoard());
    var pieceData = PieceStore.getPieceData();
    var setter = pieceSetter(gameBoard);
    setter(pieceData.piece, pieceData.rotation, pieceData.position);
    return gameBoard;
  },

  getCurrentState: function () {
    return _currentState;
  },

  tick: function () {
    PieceStore.tick();
  },

  start: function () {
    global.setInterval(function () {
      GameStore.tick();
    }, 800);
    _currentState = states.PLAYING;
  }
}, EventEmitter);

// Game store should emit all changes that occur
PieceStore.addChangeListener(function () {
  GameStore.emitChange();
});

BoardStore.addChangeListener(function () {
  GameStore.emitChange();
});

module.exports = GameStore;
