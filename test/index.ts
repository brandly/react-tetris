import assert from 'assert';
import { update, init, Action } from '../src/models/Game';

const ticks: Action[] = ['TICK', 'TICK', 'TICK'];

const test = (description: string, fn: () => void) => {
  try {
    fn();
  } catch (e) {
    console.error(description);
    throw e;
  }
};

test('Expected new piece to start at top', () => {
  let game = ticks.reduce(update, init());
  game = update(game, 'HOLD');
  assert.strictEqual(game.piece.position.y, 0);
});

test('Expected the piece to move left', () => {
  let game = ticks.reduce(update, init());
  const initX = game.piece.position.x;
  game = update(game, 'MOVE_LEFT');
  assert.strictEqual(game.piece.position.x, initX - 1);
});

test('Expected the piece to move right', () => {
  let game = ticks.reduce(update, init());
  const initX = game.piece.position.x;
  game = update(game, 'MOVE_RIGHT');
  assert.strictEqual(game.piece.position.x, initX + 1);
});

test('Expected the piece to move down', () => {
  let game = ticks.reduce(update, init());
  const initY = game.piece.position.y;
  game = update(game, 'MOVE_DOWN');
  assert.strictEqual(game.piece.position.y, initY + 1);
});

test('Expected TOGGLE_PAUSE to change state without touching matrix', () => {
  let game = ticks.reduce(update, init());
  const initMatrix = game.matrix;

  game = update(game, 'TOGGLE_PAUSE');
  assert.strictEqual(game.matrix, initMatrix);
  assert.strictEqual(game.state, 'PAUSED');

  game = update(game, 'TOGGLE_PAUSE');
  assert.strictEqual(game.matrix, initMatrix);
  assert.strictEqual(game.state, 'PLAYING');
});

test('Expected HOLD to hold piece just once', () => {
  let game = ticks.reduce(update, init());
  const initPiece = game.piece.piece;
  assert.strictEqual(game.heldPiece, undefined);

  game = update(game, 'HOLD');
  assert.strictEqual(game.heldPiece.piece, initPiece);
  assert.strictEqual(game.heldPiece.available, false);

  // Holding a second time has no effect!
  const beforeGame = game;
  game = update(game, 'HOLD');
  assert.strictEqual(beforeGame, game);
});
