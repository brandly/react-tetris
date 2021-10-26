import React from 'react';
import styled from 'styled-components';
import GamePanel from './GamePanel';
import TypedShell from './TypedShell';

const Container = styled.div`
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  font-weight: 300;
  width: 100%;
  position: relative;
`;

const Header = styled.header`
  width: 100%;
  height: 32pxp;
  background: #fafafa;
  border-bottom: 1px solid #eaeaea;
  padding: 0 18px;
`;

const Content = styled.div`
  position: relative;
`;

const VerticallyCenterChildren = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 100vh;
`;

const Heading = styled(VerticallyCenterChildren)`
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

const App = (): JSX.Element => (
  <Container>
    <Header>
      <Heading>
        <Title>react tetris</Title>
        <SubTitle>Embed a game of Tetris in your React app</SubTitle>
        <TypedShell>npm install --save react-tetris</TypedShell>
      </Heading>
    </Header>
    <Content>
      <VerticallyCenterChildren>
        <GamePanel />
      </VerticallyCenterChildren>
    </Content>
  </Container>
);

export default App;
