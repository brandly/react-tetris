var React = require('react');
// var PauseMenu = require('./pause-menu');
var Gameboard = require('./gameboard');
var GameStore = require('../stores/game-store');
var ScoreStore = require('../stores/score-store');
var HeldPiece = require('./held-piece');
var PieceQueue = require('./piece-queue');
var AppConstants = require('../constants/app-constants');
var states = AppConstants.states;

function getScore () {
  return {
    points: ScoreStore.getPoints(),
    linesCleared: ScoreStore.getLinesCleared()
  };
}

class Tetris extends React.Component {
  constructor(props) {
    super(props);
    this.state = getScore();
  }

  componentWillMount() {
    ScoreStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    ScoreStore.removeChangeListener(this._onChange);
  }

  _onChange = () => {
    this.setState(getScore());
  };

  render() {
    const { points, linesCleared } = this.state

    return this.props.children({
      HeldPiece,
      Gameboard,
      PieceQueue,
      points,
      linesCleared
    });
  }
}

module.exports = Tetris;
