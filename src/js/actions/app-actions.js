import AppConstants from '../constants/app-constants';
import AppDispatcher from '../dispatchers/app-dispatcher';

var actions = AppConstants.actions;

var AppActions = {
  moveDown: function (piece) {
    AppDispatcher.handleViewAction({
      actionType: actions.MOVE_DOWN,
      piece: piece
    });
  },

  moveLeft: function (piece) {
    AppDispatcher.handleViewAction({
      actionType: actions.MOVE_LEFT,
      piece: piece
    });
  },

  moveRight: function (piece) {
    AppDispatcher.handleViewAction({
      actionType: actions.MOVE_RIGHT,
      piece: piece
    });
  },

  hardDrop: function (piece) {
    AppDispatcher.handleViewAction({
      actionType: actions.HARD_DROP,
      piece: piece
    });
  },

  flipClockwise: function (piece) {
    AppDispatcher.handleViewAction({
      actionType: actions.FLIP_CLOCKWISE,
      piece: piece
    });
  },

  flipCounterclockwise: function (piece) {
    AppDispatcher.handleViewAction({
      actionType: actions.FLIP_COUNTERCLOCKWISE,
      piece: piece
    });
  },

  pause: function () {
    AppDispatcher.handleViewAction({
      actionType: actions.PAUSE
    });
  },

  resume: function () {
    AppDispatcher.handleViewAction({
      actionType: actions.RESUME
    });
  },

  hold: function () {
    AppDispatcher.handleViewAction({
      actionType: actions.HOLD
    });
  }
};

export default AppActions;
