var React = require('react');
var PieceStore = require('../stores/piece-store');
var PieceView = require('./piece-view');
var AppConstants = require('../constants/app-constants');
var states = AppConstants.states;

function queue () {
  return {
    queue: PieceStore.getPieceData().queue
  };
}

class PieceQueue extends React.Component {
  state = queue();

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

module.exports = PieceQueue;
