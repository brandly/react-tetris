import assert from 'assert';
import { update, getInitialGame, Action } from '../src/js/stores/game-store';

const ticks: Action[] = ['TICK', 'TICK', 'TICK'];

(() => {
  let result = ticks.reduce(update, getInitialGame());
  result = update(result, 'HOLD');

  assert.deepStrictEqual(
    result.piece.position.y,
    0,
    'Expected new piece to start at top'
  );
})();
