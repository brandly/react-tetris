import { Dispatcher } from 'flux';
import { Piece } from '../modules/piece-types';

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
  | {
      actionType: 'MOVE_DOWN';
      piece: Piece;
    }
  | {
      actionType: 'MOVE_LEFT';
      piece: Piece;
    }
  | {
      actionType: 'MOVE_RIGHT';
      piece: Piece;
    }
  | {
      actionType: 'HARD_DROP';
      piece: Piece;
    }
  | {
      actionType: 'FLIP_CLOCKWISE';
      piece: Piece;
    }
  | {
      actionType: 'FLIP_COUNTERCLOCKWISE';
      piece: Piece;
    }
  | {
      actionType: 'PAUSE';
    }
  | {
      actionType: 'RESUME';
    }
  | {
      actionType: 'HOLD';
    };

export default new AppDispatcher();
