import PieceTypes from './piece-types';

function randomNumber (under) {
  return Math.floor(Math.random() * under);
}

var piecesBucket = [];
function getRandomPiece () {
  if (piecesBucket.length === 0) {
    // fill the bucket
    for (var pieceType in PieceTypes) {
      // 4 is just the number of each type of piece. it's arbitrary, not magic, okay.
      for (var i = 0; i < 4; i++) {
        piecesBucket.push(pieceType);
      }
    }
  }
  var piece = piecesBucket.splice(randomNumber(piecesBucket.length), 1)[0];
  // might wanna clone
  return PieceTypes[piece];
}

var minimumLength = 5;
function PieceQueue (minimumLength) {
  this.minimumLength = minimumLength;
  this.queue = [];
  this.fill();
}

PieceQueue.prototype.fill = function fill () {
  while (this.queue.length < this.minimumLength) {
    this.queue.push(getRandomPiece());
  }
};

PieceQueue.prototype.getNext = function getNext () {
  var next = this.queue.shift();
  this.fill();
  return next;
};

PieceQueue.prototype.getQueue = function getQueue () {
  return this.queue;
};

export default PieceQueue;
