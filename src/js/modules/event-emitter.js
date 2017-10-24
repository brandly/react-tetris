import { EventEmitter } from 'events';
const CHANGE_EVENT = 'change';

// our base emitter
const EE = Object.extend({
  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
}, EventEmitter.prototype);

export default EE;
