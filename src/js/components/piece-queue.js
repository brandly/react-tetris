import React from 'react';
import PieceStore from '../stores/piece-store';
import PieceView from './piece-view';
import AppConstants from '../constants/app-constants';
const { states } = AppConstants;

function queue () {
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

  _onChange = () => {
    this.setState(queue());
  };

  render() {
    var pieces = this.state.queue.map(function (piece, i) {
      return (
        <PieceView piece={piece} key={i} />
      );
    });
    return (
      <div>
        {pieces}
      </div>
    )
  }
}
