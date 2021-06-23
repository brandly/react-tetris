import React from 'react';
import PieceStore from '../stores/piece-store';
import PieceView from './piece-view';

function latestQueue() {
  return {
    queue: PieceStore.getPieceData().queue
  };
}

export default class PieceQueue extends React.Component {
  constructor(props) {
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
    const { queue } = this.state;
    return (
      <div>
        {queue.map((piece, i) => (
          <PieceView piece={piece} key={i} />
        ))}
      </div>
    );
  }
}
