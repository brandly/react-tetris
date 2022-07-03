import React from 'react';
import styled from 'styled-components';
import type { Controller } from '../src/components/Tetris';

type Props = {
  controller: Controller;
};

export default function Controller({ controller }: Props): JSX.Element {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '24px 12px'
      }}
    >
      <div
        style={{
          padding: '18px',
          border: '1px solid #DDD',
          borderRadius: '72px'
        }}
      >
        <DpadRow>
          <UpDown onClick={controller.flipClockwise} />
        </DpadRow>
        <DpadMidRow>
          <LeftRight onClick={controller.moveLeft} />
          <LeftRight onClick={controller.moveRight} />
        </DpadMidRow>
        <DpadRow>
          <UpDown onClick={controller.moveDown} />
        </DpadRow>
      </div>
      <div>
        <Row>
          <RoundBtn onClick={controller.hardDrop} />
        </Row>
        <MidRow>
          <RoundBtn onClick={controller.hold} />
          <RoundBtn onClick={controller.flipClockwise} />
        </MidRow>
        <Row>
          <RoundBtn onClick={controller.flipCounterclockwise} />
        </Row>
      </div>
    </div>
  );
}

const dpadSize = 36;

const DpadRow = styled.div`
  display: flex;
  justify-content: center;
  height: ${dpadSize}px;
  width: ${dpadSize * 3}px;
`;

const DpadMidRow = styled(DpadRow)`
  align-items: center;
  justify-content: space-between;
`;

const LeftRight = styled.button`
  width: ${dpadSize}px;
  height: ${dpadSize}px;
  border: 2px solid #ddd;
`;

const UpDown = styled.button`
  width: ${dpadSize}px;
  height: ${dpadSize}px;
  border: 2px solid #ddd;
`;

const RoundBtn = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  border: 2px solid #ddd;
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
  height: 48px;
  width: 144px;
`;

const MidRow = styled(Row)`
  align-items: center;
  justify-content: space-between;
`;
