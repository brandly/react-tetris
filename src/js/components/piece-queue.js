import React from 'react';
import PieceStore from '../stores/piece-store';
import PieceView from './piece-view';

function queue() {
  return {
    queue: PieceStore.getPieceData().queue
  };
}

export default class PieceQueue extends React.Component {
  constructor(props) {
    super(props);
    this.state = queue();
  }

  componentWillMount() {
    PieceStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    PieceStore.removeChangeListener(this._onChange);
  }

  _onChange = () => {
    this.setState(queue());
  };

  render() {
    const pieces = this.state.queue.map((piece, i) => (
      <PieceView piece={piece} key={i} />
    ));
    return <div>{pieces}</div>;
  }
}
