import { Piece, pieces } from './piece-types';

class PieceQueue {
  minimumLength: number;
  queue: Piece[];
  bucket: Piece[];
  constructor(minimumLength: number) {
    this.minimumLength = minimumLength;
    this.queue = [];
    this.bucket = [];
    this.fill();
  }

  fill() {
    while (this.queue.length < this.minimumLength) {
      this.queue.push(this.pullFromBucket());
    }
  }

  getNext() {
    const next = this.queue.shift();
    this.fill();
    return next;
  }
  getQueue() {
    return this.queue;
  }

  pullFromBucket(): Piece {
    if (this.bucket.length === 0) {
      // fill the bucket
      pieces.forEach((piece) => {
        // 4 is just the number of each type of piece. it's arbitrary, not magic, okay.
        for (let i = 0; i < 4; i++) {
          this.bucket.push(piece);
        }
      });
    }
    return this.bucket.splice(randomNumber(this.bucket.length), 1)[0];
  }
}

export default PieceQueue;

function randomNumber(under) {
  return Math.floor(Math.random() * under);
}
