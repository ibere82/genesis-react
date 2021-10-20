import React from 'react';
import styled from 'styled-components';
import StartPauseButton from './StartPauseButton';
import Footer from './Footer';
import IconsArea from './IconsArea';
import GameArea from './GameArea';
import GenesisPad from './GenesisPad';
import CenterPanel from './CenterPanel';
import TopMessage from './TopMessage';

const Main = styled.main`
  display: flex;
  padding: 20px;
`;

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 15vh;
  right 15vh;
`;

export default function Page({ buttons, isClickAllowed, handleClick, message, difficulty, score, children, onGame, stopGame, startNewGame }) {

  return (
    <>
      <Main>
        <GameArea message={message}>
          <GenesisPad buttons={buttons} isClickAllowed={isClickAllowed} handleClick={handleClick} />
          <CenterPanel difficulty={difficulty} score={score} />
          <TopMessage message={message} />
        </GameArea>
        <IconsArea />
      </Main>
      <ButtonContainer>
        <StartPauseButton handle={onGame ? stopGame : startNewGame} label={onGame ? 'Cancelar' : 'Iniciar'} />
      </ButtonContainer>
      <Footer />
    </>
  );
};
