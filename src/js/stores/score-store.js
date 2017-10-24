import _ from 'lodash';
import AppDispatcher from '../dispatchers/app-dispatcher';
import AppConstants from '../constants/app-constants';
import BoardStore from './board-store';
import EventEmitter from '../modules/event-emitter';
var events = AppConstants.events;

var _points = 0, _linesCleared = 0;

var ScoreStore = _.extend({
  getPoints: function () {
    return _points;
  },

  getLinesCleared: function () {
    return _linesCleared;
  },

  addPoints: function (additional) {
    _points += additional;
    this.emitChange();
  }
}, EventEmitter);

var pointsPerLine = 100;
BoardStore.on(events.LINE_CLEARED, function (linesCleared) {
  _linesCleared += linesCleared;

  // what's this called?
  if (linesCleared === 4) {
    ScoreStore.addPoints(pointsPerLine * 10);
  } else {
    ScoreStore.addPoints(linesCleared * pointsPerLine);
  }
});

export default ScoreStore;
