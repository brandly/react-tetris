var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');
var CHANGE_EVENT = 'change';

// our base emitter
var EE = _.extend({
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

module.exports = EE;
