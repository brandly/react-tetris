import assert from 'assert';
import { update, init, Action } from '../src/js/models/Game';

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
  let result = ticks.reduce(update, init());
  result = update(result, 'HOLD');
  assert.deepStrictEqual(result.piece.position.y, 0);
});

test('Expected the piece to move left', () => {
  let result = ticks.reduce(update, init());
  const initX = result.piece.position.x;
  result = update(result, 'MOVE_LEFT');
  assert.deepStrictEqual(result.piece.position.x, initX - 1);
});

test('Expected the piece to move right', () => {
  let result = ticks.reduce(update, init());
  const initX = result.piece.position.x;
  result = update(result, 'MOVE_RIGHT');
  assert.deepStrictEqual(result.piece.position.x, initX + 1);
});

test('Expected the piece to move down', () => {
  let result = ticks.reduce(update, init());
  const initY = result.piece.position.y;
  result = update(result, 'MOVE_DOWN');
  assert.deepStrictEqual(result.piece.position.y, initY + 1);
});
