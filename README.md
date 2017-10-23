# react-tetris

> Embed a game of Tetris in your React app

```shell
$ npm install --save react-tetris
```

[view demo](http://brandly.github.io/react-tetris/)

```js
const React = require('react');
const Tetris = require('react-tetris');

const App = () =>
  <div>
    <h1>Tetris</h1>
    <Tetris>
      {({
        HeldPiece,
        Gameboard,
        PieceQueue,
        points,
        linesCleared
      }) => {
        return (
          <div className="row">
            <div className="col-md-2">
              <HeldPiece />
              <div>
                <p>Points: {points}</p>
                <p>Lines Cleared: {linesCleared}</p>
              </div>
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
```
