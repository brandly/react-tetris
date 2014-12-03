// Closure around a board
// the returned function will set a piece on that board
module.exports = function (board) {
  return function (piece, rotation, position) {
    var blocks = piece.blocks[rotation];

    for (var x = 0; x < piece.blocks[0].length; x++) {
      for (var y = 0; y < piece.blocks[0].length; y++) {
        var block = blocks[y][x];
        if (block) {
          var boardX = position.x + x;
          var boardY = position.y + y;
          board[boardY][boardX] = piece.className;
        }
      }
    }
  }
}
