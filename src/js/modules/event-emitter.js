import { EventEmitter } from 'events';
import _ from 'lodash';

const CHANGE_EVENT = 'change';

// our base emitter
const EE = _.extend(
  {
    emitChange() {
      this.emit(CHANGE_EVENT);
    },

    addChangeListener(callback) {
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener(callback) {
      this.removeListener(CHANGE_EVENT, callback);
    }
  },
  EventEmitter.prototype
);

export default EE;
