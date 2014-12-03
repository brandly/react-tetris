
module.exports = {
  actions: {
    HARD_DROP: 'HARD_DROP',
    MOVE_LEFT: 'MOVE_LEFT',
    MOVE_RIGHT: 'MOVE_RIGHT',
    FLIP_CLOCKWISE: 'FLIP_CLOCKWISE',
    FLIP_COUNTERCLOCKWISE: 'FLIP_COUNTERCLOCKWISE',
    PAUSE: 'PAUSE',
    RESUME: 'RESUME'
  },

  states: {
    PAUSED: 'PAUSED',
    PLAYING: 'PLAYING'
  },

  events: {
    LINE_CLEARED: 'LINE_CLEARED'
  },

  // dimensions in "blocks"
  GAME_WIDTH: 10,
  GAME_HEIGHT: 20
};
