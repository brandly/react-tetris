var React = require('react');
var ScoreStore = require('../stores/score-store');

function getScore () {
  return {
    points: ScoreStore.getPoints(),
    linesCleared: ScoreStore.getLinesCleared()
  };
}

class Scoreboard extends React.Component {
  state = getScore();

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
    return (
      <div>
        <p>Points: {this.state.points}</p>
        <p>Lines Cleared: {this.state.linesCleared}</p>
      </div>
    )
  }
}

module.exports = Scoreboard;
