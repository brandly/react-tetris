import AppConstants from '../constants/app-constants';
import AppDispatcher from '../dispatchers/app-dispatcher';

const { actions } = AppConstants;

const AppActions = {
  moveDown(piece) {
    AppDispatcher.handleViewAction({
      actionType: actions.MOVE_DOWN,
      piece
    });
  },

  moveLeft(piece) {
    AppDispatcher.handleViewAction({
      actionType: actions.MOVE_LEFT,
      piece
    });
  },

  moveRight(piece) {
    AppDispatcher.handleViewAction({
      actionType: actions.MOVE_RIGHT,
      piece
    });
  },

  hardDrop(piece) {
    AppDispatcher.handleViewAction({
      actionType: actions.HARD_DROP,
      piece
    });
  },

  flipClockwise(piece) {
    AppDispatcher.handleViewAction({
      actionType: actions.FLIP_CLOCKWISE,
      piece
    });
  },

  flipCounterclockwise(piece) {
    AppDispatcher.handleViewAction({
      actionType: actions.FLIP_COUNTERCLOCKWISE,
      piece
    });
  },

  pause() {
    AppDispatcher.handleViewAction({
      actionType: actions.PAUSE
    });
  },

  resume() {
    AppDispatcher.handleViewAction({
      actionType: actions.RESUME
    });
  },

  hold() {
    AppDispatcher.handleViewAction({
      actionType: actions.HOLD
    });
  }
};

export default AppActions;
