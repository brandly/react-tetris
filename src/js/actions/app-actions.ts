import AppDispatcher from '../dispatchers/app-dispatcher';

const AppActions = {
  moveDown(piece) {
    AppDispatcher.handleViewAction({
      actionType: 'MOVE_DOWN',
      piece
    });
  },

  moveLeft(piece) {
    AppDispatcher.handleViewAction({
      actionType: 'MOVE_LEFT',
      piece
    });
  },

  moveRight(piece) {
    AppDispatcher.handleViewAction({
      actionType: 'MOVE_RIGHT',
      piece
    });
  },

  hardDrop(piece) {
    AppDispatcher.handleViewAction({
      actionType: 'HARD_DROP',
      piece
    });
  },

  flipClockwise(piece) {
    AppDispatcher.handleViewAction({
      actionType: 'FLIP_CLOCKWISE',
      piece
    });
  },

  flipCounterclockwise(piece) {
    AppDispatcher.handleViewAction({
      actionType: 'FLIP_COUNTERCLOCKWISE',
      piece
    });
  },

  pause() {
    AppDispatcher.handleViewAction({
      actionType: 'PAUSE'
    });
  },

  resume() {
    AppDispatcher.handleViewAction({
      actionType: 'RESUME'
    });
  },

  hold() {
    AppDispatcher.handleViewAction({
      actionType: 'HOLD'
    });
  }
};

export default AppActions;
