var React = require('react');
var Tetris = require('./tetris');

class app extends React.Component {
  render() {
    return (
      <div>
        <h1>Tetris</h1>
        <Tetris>
          {({
            HeldPiece,
            Scoreboard,
            Gameboard,
            PieceQueue
          }) => {
            return (
              <div className="row">
                <div className="col-md-2">
                  <HeldPiece />
                  <Scoreboard />
                </div>

                <div className="col-md-4">
                  <Gameboard />
                </div>

                <div className="col-md-4">
                  <PieceQueue />
                </div>
              </div>
            )
          }}
        </Tetris>
      </div>
    )
  }
}

module.exports = app;
