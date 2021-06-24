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
    const local: Piece[] = [];
    while (local.length + this.queue.length < this.minimumLength) {
      local.push(this.pullFromBucket());
    }
    this.queue = this.queue.concat(local);
  }

  getNext() {
    const next = this.queue[0];
    this.queue = this.queue.slice(1);
    this.fill();
    if (!next) {
      throw new Error('Unexpected missing `next`');
    }
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

function randomNumber(under: number): number {
  return Math.floor(Math.random() * under);
}
