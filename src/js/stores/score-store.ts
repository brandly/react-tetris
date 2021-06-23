import _ from 'lodash';
import AppConstants from '../constants/app-constants';
import BoardStore from './board-store';
import EventEmitter from '../modules/event-emitter';

const { events } = AppConstants;

let points = 0;
let linesCleared = 0;

class ScoreStore extends EventEmitter {
  getPoints() {
    return points;
  }

  getLinesCleared() {
    return linesCleared;
  }

  addPoints(additional: number): void {
    points += additional;
    this.emitChange();
  }
}

const store = new ScoreStore();

const pointsPerLine = 100;
BoardStore.on(events.LINE_CLEARED, (additionalLines) => {
  linesCleared += additionalLines;

  // what's this called?
  if (additionalLines === 4) {
    store.addPoints(pointsPerLine * 10);
  } else {
    store.addPoints(additionalLines * pointsPerLine);
  }
});

export default store;
