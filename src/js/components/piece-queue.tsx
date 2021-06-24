import React from 'react';
import { Piece } from '../modules/piece-types';
import PieceStore from '../stores/piece-store';
import PieceView from './piece-view';

type State = {
  queue: Piece[];
};

function latestQueue(): State {
  return {
    queue: PieceStore.getPieceData().queue
  };
}

export default class PieceQueue extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = latestQueue();
  }

  componentDidMount() {
    PieceStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    PieceStore.removeChangeListener(this._onChange);
  }

  _onChange = () => {
    this.setState(latestQueue());
  };

  render() {
    const { queue } = this.state as State;
    return (
      <div>
        {queue.map((piece, i) => (
          <PieceView piece={piece} key={i} />
        ))}
      </div>
    );
  }
}
