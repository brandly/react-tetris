import React from 'react';
// import PauseMenu from './pause-menu';
import Gameboard from './gameboard';
import GameStore from '../stores/game-store';
import ScoreStore from '../stores/score-store';
import HeldPiece from './held-piece';
import PieceQueue from './piece-queue';
import AppConstants from '../constants/app-constants';
const { states } = AppConstants;

function getScore () {
  return {
    points: ScoreStore.getPoints(),
    linesCleared: ScoreStore.getLinesCleared()
  };
}

export default class Tetris extends React.Component {
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
