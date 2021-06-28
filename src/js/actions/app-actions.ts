import AppDispatcher from '../dispatchers/app-dispatcher';

const AppActions = {
  moveDown(): void {
    AppDispatcher.handleViewAction('MOVE_DOWN');
  },

  moveLeft(): void {
    AppDispatcher.handleViewAction('MOVE_LEFT');
  },

  moveRight(): void {
    AppDispatcher.handleViewAction('MOVE_RIGHT');
  },

  hardDrop(): void {
    AppDispatcher.handleViewAction('HARD_DROP');
  },

  flipClockwise(): void {
    AppDispatcher.handleViewAction('FLIP_CLOCKWISE');
  },

  flipCounterclockwise(): void {
    AppDispatcher.handleViewAction('FLIP_COUNTERCLOCKWISE');
  },

  pause(): void {
    AppDispatcher.handleViewAction('PAUSE');
  },

  resume(): void {
    AppDispatcher.handleViewAction('RESUME');
  },

  hold(): void {
    AppDispatcher.handleViewAction('HOLD');
  }
};

export default AppActions;
