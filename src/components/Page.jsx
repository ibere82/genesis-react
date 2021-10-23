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
  bottom: 70px;
  right: 100px;
`;

export default function Page({ buttons, isClickAllowed, handleClick, message, level, score,  onGame, stopGame, startNewGame }) {

  return (
    <>
      <Main>
        <GameArea message={message}>
          <GenesisPad buttons={buttons} isClickAllowed={isClickAllowed} handleClick={handleClick} />
          <CenterPanel level={level} score={score} />
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
