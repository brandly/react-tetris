const React = require('react');
const GameStore = require('../stores/game-store');

function gameState() {
  return {
    gameState: GameStore.getCurrentState()
  };
}

class PauseMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = gameState();
  }

  componentDidMount() {
    GameStore.addChangeListener(this._onChange);
  }

  _onChange = () => {
    this.setState(gameState());
  };

  render() {
    return (
      <div className="overlay">
        <h1>hi</h1>
      </div>
    );
  }
}

module.exports = PauseMenu;
