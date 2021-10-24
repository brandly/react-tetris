import assert from 'assert';
import { update, getInitialGame, Action } from '../src/js/stores/game-store';

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
  let result = ticks.reduce(update, getInitialGame());
  result = update(result, 'HOLD');
  assert.deepStrictEqual(result.piece.position.y, 0);
});
