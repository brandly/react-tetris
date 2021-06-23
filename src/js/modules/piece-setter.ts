// Closure around a board
// the returned function will set a piece on that board
export default function createPieceSetter(board) {
  return function pieceSetter(blocks, position, className) {
    for (let x = 0; x < blocks[0].length; x++) {
      for (let y = 0; y < blocks[0].length; y++) {
        const block = blocks[y][x];
        if (block) {
          const boardX = position.x + x;
          const boardY = position.y + y;
          if (board[boardY]) {
            /* eslint-disable no-param-reassign */
            board[boardY][boardX] = className;
          }
        }
      }
    }
  };
}
