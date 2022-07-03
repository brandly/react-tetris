import { Piece, pieces } from '../models/Piece';

export type PieceQueue = {
  minimumLength: number;
  queue: Piece[];
  bucket: Piece[];
};

export function create(minimumLength: number): PieceQueue {
  return fill({
    minimumLength,
    queue: [],
    bucket: []
  });
}

function fill(pieceQueue: PieceQueue): PieceQueue {
  const local: Piece[] = [];
  let bucket = pieceQueue.bucket;
  while (local.length + pieceQueue.queue.length < pieceQueue.minimumLength) {
    const [piece, updatedBucket] = pullFromBucket(bucket);
    local.push(piece);
    bucket = updatedBucket;
  }

  return {
    ...pieceQueue,
    queue: pieceQueue.queue.concat(local)
  };
}

export function getNext(pieceQueue: PieceQueue): {
  piece: Piece;
  queue: PieceQueue;
} {
  if (!pieceQueue.queue[0]) {
    throw new Error('Unexpected empty queue');
  }
  const next = pieceQueue.queue[0];
  const queue = pieceQueue.queue.slice(1);
  return {
    piece: next,
    queue: fill({
      ...pieceQueue,
      queue
    })
  };
}

function pullFromBucket(bucket: Piece[]): [Piece, Piece[]] {
  const local = bucket.slice(0);
  if (local.length === 0) {
    // fill the bucket
    pieces.forEach((piece) => {
      // 4 is just the number of each type of piece. it's arbitrary, not magic, okay.
      for (let i = 0; i < 4; i++) {
        local.push(piece);
      }
    });
  }
  const randomPiece = local.splice(randomNumber(local.length), 1)[0];
  if (!randomPiece) {
    console.error('bucket:', JSON.stringify(local));
    throw new Error(`Unexpected: failed to pull from bucket`);
  }
  return [randomPiece, local];
}

export default PieceQueue;

function randomNumber(under: number): number {
  return Math.floor(Math.random() * under);
}
