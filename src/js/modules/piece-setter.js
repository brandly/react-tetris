// Closure around a board
// the returned function will set a piece on that board
module.exports = function (board) {
  return function (blocks, position, className) {
    for (var x = 0; x < blocks[0].length; x++) {
      for (var y = 0; y < blocks[0].length; y++) {
        var block = blocks[y][x];
        if (block) {
          var boardX = position.x + x;
          var boardY = position.y + y;
          board[boardY][boardX] = className;
        }
      }
    }
  }
}
