import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: "center";
`;

const Board = styled.div`
  position: absolute;
  top: 0;
  right: calc(50% - 48vh);
  border-radius: 100%;
  background: linear-gradient(60deg, black, gray);
  border: black 1px solid;
  width: 96vh;
  height: 96vh;

  @media(max-width: 800px) {
    width: 46vh;
    height: 46vh;
    top: calc(20%);
    right: calc(50% - 34vh);

   }
`;

export default function GameArea({ children }) {

  const [GenesisPad, CenterPanel, TopMessage] = children;

  return (
    <Wrapper>
      <Board>
        {TopMessage}
        {GenesisPad}
        {CenterPanel}
      </Board>
    </Wrapper>
  );
};
