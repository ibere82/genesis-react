import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: space-between;
  `;

const Board = styled.div`
  position: absolute;
  top: 0;
  right: calc(50% - 45vh);
  border-radius: 100%;
  background: linear-gradient(60deg, black, gray);
  border: black 1px solid;
  width: 90vh;
  height: 90vh;

  @media(max-width: 600px) {
    width: 44vh;
    height: 44vh;
    top: calc(20%);
    right: calc(50% - 22vh);
   }
`;

export default function GameArea({ children }) {

  const [LangMenu, GenesisPad, CenterPanel, TopMessage, IconsArea] = children;

  return (
    <Wrapper>
      {LangMenu}
      <Board>
        {TopMessage}
        {GenesisPad}
        {CenterPanel}
      </Board>
      {IconsArea}
    </Wrapper>
  );

};
