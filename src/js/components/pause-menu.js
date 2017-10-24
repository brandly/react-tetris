var React = require('react');
var Gameboard = require('./gameboard');
var GameStore = require('../stores/game-store');
var AppConstants = require('../constants/app-constants');
var states = AppConstants.states;

function gameState () {a
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
    )
  }
}

module.exports = PauseMenu;
