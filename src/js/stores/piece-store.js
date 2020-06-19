import _ from 'lodash';
import AppDispatcher from '../dispatchers/app-dispatcher';
import AppConstants from '../constants/app-constants';
import BoardStore from './board-store';
import EventEmitter from '../modules/event-emitter';
import PieceQueue from '../modules/piece-queue';

const { events, actions } = AppConstants;

// local data
let _piece;
let _rotation;
let _position;
let _heldPiece;
let _hasHeldPiece;

function _moveLeft() {
  // compute new position
  const newPosition = _.clone(_position);
  newPosition.x -= 1;
  // ask board if it's valid
  if (BoardStore.isEmptyPosition(_piece, _rotation, newPosition)) {
    // if so, set it as the position and return true
    _position = newPosition;
    return true;
  }
  return false;
}

function _moveRight() {
  const newPosition = _.clone(_position);
  newPosition.x += 1;
  if (BoardStore.isEmptyPosition(_piece, _rotation, newPosition)) {
    _position = newPosition;
    return true;
  }
  return false;
}

function _moveDown() {
  const newPosition = _.clone(_position);
  newPosition.y += 1;

  if (BoardStore.isEmptyPosition(_piece, _rotation, newPosition)) {
    _position = newPosition;
    return true;
  }
  _lockInPiece();
  return false;
}

function _hardDrop() {
  _position.y = _getHardDropY();
  _lockInPiece();
}

function _flipClockwise() {
  const newRotation = (_rotation + 1) % _piece.blocks.length;
  if (BoardStore.isEmptyPosition(_piece, newRotation, _position)) {
    _rotation = newRotation;
    return true;
  }
  return false;
}

function _flipCounterclockwise() {
  let newRotation = _rotation - 1;
  if (newRotation < 0) newRotation += _piece.blocks.length;

  if (BoardStore.isEmptyPosition(_piece, newRotation, _position)) {
    _rotation = newRotation;
    return true;
  }
  return false;
}

function _lockInPiece() {
  BoardStore.setPiece(_piece, _rotation, _position);
  setUpNewPiece();
}

function _holdPiece() {
  if (_hasHeldPiece) return false;
  if (
    _heldPiece &&
    !BoardStore.isEmptyPosition(_heldPiece, _rotation, _position)
  ) {
    return false;
  }

  const previouslyHeldPiece = _heldPiece;
  _heldPiece = _piece;
  _hasHeldPiece = true;

  if (previouslyHeldPiece) {
    _piece = previouslyHeldPiece;
  } else {
    setUpNewPiece();
  }

  return true;
}

function _getHardDropY() {
  let yPosition = _position.y;

  while (
    BoardStore.isEmptyPosition(_piece, _rotation, {
      y: yPosition,
      x: _position.x
    })
  ) {
    yPosition += 1;
  }
  // at this point, we just found a non-empty position, so let's step back
  return yPosition - 1;
}

const PieceStore = _.extend(
  {
    getPieceData() {
      return {
        piece: _piece,
        rotation: _rotation,
        position: _position,
        previewPosition: {
          x: _position.x,
          y: _getHardDropY()
        },

        heldPiece: _heldPiece,
        queue: queue.getQueue()
      };
    },

    tick() {
      emitChangeIf(_moveDown());
    },

    dispatcherIndex: AppDispatcher.register((payload) => {
      const { action } = payload; // this is our action from handleViewAction
      switch (action.actionType) {
        case actions.MOVE_DOWN:
          emitChangeIf(_moveDown());
          break;

        case actions.MOVE_LEFT:
          emitChangeIf(_moveLeft());
          break;

        case actions.MOVE_RIGHT:
          emitChangeIf(_moveRight());
          break;

        case actions.HARD_DROP:
          emitChangeIf(_hardDrop());
          break;

        case actions.FLIP_CLOCKWISE:
          emitChangeIf(_flipClockwise());
          break;

        case actions.FLIP_COUNTERCLOCKWISE:
          emitChangeIf(_flipCounterclockwise());
          break;

        case actions.HOLD:
          emitChangeIf(_holdPiece());
          break;
      }

      // going into a queue of promises so we want to return something positive for a resolve
      return true;
    }),

    emitPlayerLost() {
      this.emit(events.PLAYER_LOST);
    }
  },
  EventEmitter
);

function emitChangeIf(val) {
  if (val) PieceStore.emitChange();
}

const queue = new PieceQueue(5);

const initialPosition = (() => {
  const somePiece = queue.getNext();
  return {
    x: AppConstants.GAME_WIDTH / 2 - somePiece.blocks.length / 2,
    y: 0
  };
})();

function setUpNewPiece() {
  // new values for everyone
  _piece = queue.getNext();
  _rotation = 0;
  _position = _.clone(initialPosition);
  _hasHeldPiece = false;
  if (!BoardStore.isEmptyPosition(_piece, _rotation, _position)) {
    PieceStore.emitPlayerLost();
  }
  PieceStore.emitChange();
}

setUpNewPiece();
export default PieceStore;
