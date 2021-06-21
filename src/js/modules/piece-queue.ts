import PieceTypes from './piece-types';

function randomNumber(under) {
  return Math.floor(Math.random() * under);
}

const piecesBucket = [];
function getRandomPiece() {
  if (piecesBucket.length === 0) {
    // fill the bucket
    Object.keys(PieceTypes).forEach((pieceType) => {
      // 4 is just the number of each type of piece. it's arbitrary, not magic, okay.
      for (let i = 0; i < 4; i++) {
        piecesBucket.push(pieceType);
      }
    });
  }
  const piece = piecesBucket.splice(randomNumber(piecesBucket.length), 1)[0];
  // might wanna clone
  return PieceTypes[piece];
}

function PieceQueue(minimumLength) {
  this.minimumLength = minimumLength;
  this.queue = [];
  this.fill();
}

PieceQueue.prototype.fill = function fill() {
  while (this.queue.length < this.minimumLength) {
    this.queue.push(getRandomPiece());
  }
};

PieceQueue.prototype.getNext = function getNext() {
  const next = this.queue.shift();
  this.fill();
  return next;
};

PieceQueue.prototype.getQueue = function getQueue() {
  return this.queue;
};

export default PieceQueue;
