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
          <div>
            <div>
              <HeldPiece />
              <div>
                <p>Points: {points}</p>
                <p>Lines Cleared: {linesCleared}</p>
              </div>
            </div>

            <div>
              <Gameboard />
            </div>

            <div>
              <PieceQueue />
            </div>
          </div>
        )
      }}
    </Tetris>
  </div>
```
