import React from 'react';
// import PauseMenu from './pause-menu';
import Gameboard from './gameboard';
import ScoreStore from '../stores/score-store';
import HeldPiece from './held-piece';
import PieceQueue from './piece-queue';

type RenderFn = (params: {
  HeldPiece: React.ComponentType;
  Gameboard: React.ComponentType;
  PieceQueue: React.ComponentType;
  points: number;
  linesCleared: number;
}) => React.ReactElement;

type Props = {
  children: RenderFn;
};

type State = {
  points: number;
  linesCleared: number;
};

function getScore(): State {
  return {
    points: ScoreStore.getPoints(),
    linesCleared: ScoreStore.getLinesCleared()
  };
}

export default class Tetris extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = getScore();
  }

  componentDidMount() {
    ScoreStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    ScoreStore.removeChangeListener(this._onChange);
  }

  _onChange = () => {
    this.setState(getScore());
  };

  render() {
    const { children } = this.props;
    const { points, linesCleared } = this.state;

    return children({
      HeldPiece,
      Gameboard,
      PieceQueue,
      points,
      linesCleared
    });
  }
}
