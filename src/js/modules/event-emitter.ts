import { EventEmitter as Base } from 'events';

const CHANGE_EVENT = 'change';

type Callback = () => void;

// our base emitter
class EventEmitter extends Base {
  emitChange(): void {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback: Callback): void {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback: Callback): void {
    this.removeListener(CHANGE_EVENT, callback);
  }
}

export default EventEmitter;
