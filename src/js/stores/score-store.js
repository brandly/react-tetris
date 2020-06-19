import _ from 'lodash';
import AppConstants from '../constants/app-constants';
import BoardStore from './board-store';
import EventEmitter from '../modules/event-emitter';

const { events } = AppConstants;

let points = 0;
let linesCleared = 0;

const ScoreStore = _.extend(
  {
    getPoints() {
      return points;
    },

    getLinesCleared() {
      return linesCleared;
    },

    addPoints(additional) {
      points += additional;
      this.emitChange();
    }
  },
  EventEmitter
);

const pointsPerLine = 100;
BoardStore.on(events.LINE_CLEARED, (additionalLines) => {
  linesCleared += additionalLines;

  // what's this called?
  if (additionalLines === 4) {
    ScoreStore.addPoints(pointsPerLine * 10);
  } else {
    ScoreStore.addPoints(additionalLines * pointsPerLine);
  }
});

export default ScoreStore;
