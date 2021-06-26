import AppDispatcher from '../dispatchers/app-dispatcher';

const AppActions = {
  moveDown() {
    AppDispatcher.handleViewAction('MOVE_DOWN');
  },

  moveLeft() {
    AppDispatcher.handleViewAction('MOVE_LEFT');
  },

  moveRight() {
    AppDispatcher.handleViewAction('MOVE_RIGHT');
  },

  hardDrop() {
    AppDispatcher.handleViewAction('HARD_DROP');
  },

  flipClockwise() {
    AppDispatcher.handleViewAction('FLIP_CLOCKWISE');
  },

  flipCounterclockwise() {
    AppDispatcher.handleViewAction('FLIP_COUNTERCLOCKWISE');
  },

  pause() {
    AppDispatcher.handleViewAction('PAUSE');
  },

  resume() {
    AppDispatcher.handleViewAction('RESUME');
  },

  hold() {
    AppDispatcher.handleViewAction('HOLD');
  }
};

export default AppActions;
