import styled from 'styled-components';
import StartPauseButton from './StartPauseButton';
import Footer from './Footer';
import LangMenu from './LangMenu';
import IconsArea from './IconsArea';
import GameArea from './GameArea';
import GenesisPad from './GenesisPad';
import CenterPanel from './CenterPanel';
import TopMessage from './TopMessage';
import { CLICK, START, STOP, } from '../state/actionsTypes.js';


const Main = styled.main`
  display: flex;
  padding: 20px;
`;

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 70px;
  right: 100px;
`;

export default function Page({  dispatch, mutable }) {

  const { game, texts, features } = mutable

  const { level, message, isClickAllowed, onGame, score } = game;
  const { abortedGameMessage, stopGameButtonLabel, startGameButtonLabel } = texts
  const { buttons, languages } = features;



  const handleClick = (color) => {
    dispatch({ type: CLICK, payload: { color } })
  }

  const startNewGame = () => {
    dispatch({ type: START })
  }

  const stopGame = () => {
    dispatch({ type: STOP, payload: { message: abortedGameMessage } })
  }

  return (
    <>
      <Main>
        <LangMenu langs={languages} dispatch={dispatch} />
        <GameArea message={message}>
          <GenesisPad buttons={buttons} isClickAllowed={isClickAllowed} handleClick={(color) => handleClick(color)} />
          <CenterPanel labels={texts} level={level} score={score} />
          <TopMessage message={message} />
        </GameArea>
        <IconsArea />
      </Main>
      <ButtonContainer>
        <StartPauseButton handle={onGame ? stopGame : startNewGame} label={onGame ? stopGameButtonLabel : startGameButtonLabel} />
      </ButtonContainer>
      <Footer />
    </>
  );
};
