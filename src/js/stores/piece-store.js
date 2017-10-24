import AppDispatcher from '../dispatchers/app-dispatcher';
import AppConstants from '../constants/app-constants';
import PieceTypes from '../modules/piece-types';
import BoardStore from './board-store';
import EventEmitter from '../modules/event-emitter';
import PieceQueue from '../modules/piece-queue';
import _ from 'lodash';
var events = AppConstants.events;

var actions = AppConstants.actions;

// local data
var _piece, _rotation, _position, _heldPiece;

function _moveLeft () {
  // compute new position
  var newPosition = _.clone(_position);
  newPosition.x -= 1;
  // ask board if it's valid
  if (BoardStore.isEmptyPosition(_piece, _rotation, newPosition)) {
    // if so, set it as the position and return true
    _position = newPosition;
    return true;
  }
}

function _moveRight () {
  var newPosition = _.clone(_position);
  newPosition.x += 1;
  if (BoardStore.isEmptyPosition(_piece, _rotation, newPosition)) {
    _position = newPosition;
    return true;
  }
}

function _moveDown () {
  var newPosition = _.clone(_position);
  newPosition.y += 1;

  if (BoardStore.isEmptyPosition(_piece, _rotation, newPosition)) {
    _position = newPosition;
    return true;
  } else {
    _lockInPiece();
  }
}

function _hardDrop () {
  _position.y = _getHardDropY();
  _lockInPiece();
}

function _flipClockwise () {
  var newRotation = (_rotation + 1) % _piece.blocks.length;
  if (BoardStore.isEmptyPosition(_piece, newRotation, _position)) {
    _rotation = newRotation;
    return true;
  }
}

function _flipCounterclockwise () {
  var newRotation = _rotation - 1;
  if (newRotation < 0) newRotation += _piece.blocks.length;

  if (BoardStore.isEmptyPosition(_piece, newRotation, _position)) {
    _rotation = newRotation;
    return true;
  }
}

function _lockInPiece () {
  BoardStore.setPiece(_piece, _rotation, _position);
  setUpNewPiece();
}

function _holdPiece () {
  if (_heldPiece && !BoardStore.isEmptyPosition(_heldPiece, _rotation, _position)) {
    return false;
  }

  var previouslyHeldPiece = _heldPiece;
  _heldPiece = _piece;

  if (previouslyHeldPiece) {
    _piece = previouslyHeldPiece;
  } else {
    setUpNewPiece();
  }

  return true;
}

function _getHardDropY () {
  var yPosition = _position.y;

  while (BoardStore.isEmptyPosition(_piece, _rotation, {y: yPosition, x: _position.x})) {
    yPosition += 1;
  }
  // at this point, we just found a non-empty position, so let's step back
  return yPosition - 1;
}

var PieceStore = _.extend({
  getPieceData: function () {
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

  tick: function () {
    emitChangeIf(_moveDown());
  },

  dispatcherIndex: AppDispatcher.register(function (payload) {
    var action = payload.action; // this is our action from handleViewAction
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

   emitPlayerLost: function () {
    this.emit(events.PLAYER_LOST);
   }
}, EventEmitter);

function emitChangeIf (val) {
  if (val) PieceStore.emitChange();
}

var queue = new PieceQueue(5);

var initialPosition = (function () {
  var somePiece = queue.getNext();
  return {
    x: (AppConstants.GAME_WIDTH / 2) - (somePiece.blocks.length / 2),
    y: 0
  }
}());

function setUpNewPiece () {
  // new values for everyone
  _piece = queue.getNext();
  _rotation = 0;
  _position = _.clone(initialPosition);
  PieceStore.emitChange();
  if (!BoardStore.isEmptyPosition(_piece, _rotation, _position)) {
    PieceStore.emitPlayerLost();
  }
}

setUpNewPiece();
export default PieceStore;
