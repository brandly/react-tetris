import React from 'react';
/* eslint-disable import/no-extraneous-dependencies */
import styled from 'styled-components';
import Tetris from '../src/js/components/tetris';

const Container = styled.div`
  margin: 24px auto 0;
  width: 100%;
  max-width: 376px;
`;

const Score = styled.div`
  position: relative;
  font-family: monospace;
  font-size: 18px;
  color: #888;
`;

const LeftHalf = styled.div`
  display: inline-block;
  width: 50%;
`;

const RightHalf = LeftHalf.extend`
  text-align: right;
`;

const Column = styled.div`
  display: inline-block;
  vertical-align: top;
`;

const LeftColumn = Column.extend`
  width: 88px;
`;

const RightColumn = LeftColumn.extend`
  padding-left: 15px;
`;

const MiddleColumn = Column.extend`
  width: 200px;
`;

const Popup = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  padding: 12px 24px;
  border-radius: 4px;
  text-align: center;
`;

const Alert = styled.h2`
  color: #666;
  margin: 0;
`;

const Button = styled.button`
  border: 1px solid #666;
  background: none;
  margin-top: 12px;
  border-radius: 4px;
`

const GamePanel = () => (
  <Container>
    <Tetris>
      {({
        Gameboard,
        HeldPiece,
        PieceQueue,
        points,
        linesCleared,
        state,
        reset
      }) => (
        <div>
          <div style={{ opacity: state === 'PLAYING' ? 1 : 0.5 }}>
            <Score>
              <LeftHalf>
                <p>
                  points
                  <br />
                  <Digits>{points}</Digits>
                </p>
              </LeftHalf>
              <RightHalf>
                <p>
                  lines
                  <br />
                  <Digits>{linesCleared}</Digits>
                </p>
              </RightHalf>
            </Score>

            <LeftColumn>
              <HeldPiece />
            </LeftColumn>

            <MiddleColumn>
              <Gameboard />
            </MiddleColumn>

            <RightColumn>
              <PieceQueue />
            </RightColumn>
          </div>

          {state === 'PAUSED' && (
            <Popup>
              <Alert>Paused</Alert>
            </Popup>
          )}

          {state === 'LOST' && (
            <Popup>
              <Alert>Game Over</Alert>
              <Button onClick={reset}>Start</Button>
            </Popup>
          )}
        </div>
      )}
    </Tetris>
  </Container>
);

const Digit = styled.span`
  font-family: monospace;
  padding: 1px;
  margin: 1px;
  font-size: 24px;
`;

const Digits = ({ children, count = 4 }) => {
  let str = children.toString();

  while (str.length < count) {
    str = `${0}${str}`;
  }

  return str
    .split('')
    .map((digit, index) => <Digit key={index}>{digit}</Digit>);
};

export default GamePanel;
