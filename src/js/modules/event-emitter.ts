import { EventEmitter as Base } from 'events';
import _ from 'lodash';

const CHANGE_EVENT = 'change';

type Callback = () => void;

// our base emitter
class EventEmitter extends Base {
  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback: Callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback: Callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
}

export default EventEmitter;
