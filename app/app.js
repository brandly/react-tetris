import React from 'react';
/* eslint-disable import/no-extraneous-dependencies */
import styled from 'styled-components';
import GamePanel from './GamePanel';

const Container = styled.div`
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  font-weight: 300;
  width: 100%;
  position: relative;
`;

const LeftHalf = styled.div`
  width: 50%;
  min-height: 100vh;
  background: #fafafa;
  border-right: 1px solid #eaeaea;
  padding: 0 18px;
`;

const RightHalf = styled.div`
  width: 50%;
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
`;

const VerticallyCenterChildren = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 100vh;
`;

const Heading = VerticallyCenterChildren.extend`
  text-align: center;
`;

const Title = styled.h1`
  font-weight: 300;
  color: #000;
`;

const SubTitle = styled.h2`
  font-weight: 300;
  font-size: 18px;
`;

const Shell = styled.div`
  display: inline-block;
  margin: 18px 0;
  font-family: Consolas, 'Andale Mono WT', 'Andale Mono', 'Lucida Console',
    'Lucida Sans Typewriter', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono',
    'Liberation Mono', 'Nimbus Mono L', Monaco, 'Courier New', Courier,
    monospace;
  border-radius: 5px;
  background: #fff;
  border: 1px solid #eaeaea;
  padding: 12px 18px;
`;

const App = () => (
  <Container>
    <LeftHalf>
      <Heading>
        <Title>react tetris</Title>
        <SubTitle>Embed a game of Tetris in your React app</SubTitle>
        <Shell>$ npm install --save react-tetris</Shell>
      </Heading>
    </LeftHalf>
    <RightHalf>
      <VerticallyCenterChildren>
        <GamePanel />
      </VerticallyCenterChildren>
    </RightHalf>
  </Container>
);

export default App;
