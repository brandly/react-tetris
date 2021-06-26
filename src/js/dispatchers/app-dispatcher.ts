import { Dispatcher } from 'flux';

class AppDispatcher extends Dispatcher<{
  source: 'VIEW_ACTION';
  action: Action;
}> {
  constructor() {
    super();
  }
  handleViewAction(action: Action) {
    this.dispatch({
      source: 'VIEW_ACTION',
      action
    });
  }
}

export type Action =
  | 'MOVE_DOWN'
  | 'MOVE_LEFT'
  | 'MOVE_RIGHT'
  | 'HARD_DROP'
  | 'FLIP_CLOCKWISE'
  | 'FLIP_COUNTERCLOCKWISE'
  | 'PAUSE'
  | 'RESUME'
  | 'HOLD';

export default new AppDispatcher();
