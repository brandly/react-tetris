import { EventEmitter as Base } from 'events';
import _ from 'lodash';

const CHANGE_EVENT = 'change';

// our base emitter
class EventEmitter extends Base {
  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
}

export default EventEmitter;
