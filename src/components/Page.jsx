import styled from 'styled-components';
import StartPauseButton from './StartPauseButton';
import Footer from './Footer';
import LangMenu from './LangMenu';
import Flag from './Flag';
import Pad from './Pad';
import IconsArea from './IconsArea';
import GameArea from './GameArea';
import GenesisPad from './GenesisPad';
import CenterPanel from './CenterPanel';
import TopMessage from './TopMessage';
import { START, STOP, } from '../state/actionsTypes.js';


const Main = styled.main`
  display: flex;
  padding: 20px;
`;

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 70px;
  right: 100px;
`;

export default function Page({ dispatch, mutable }) {

  const { texts, level, message, isClickAllowed, onGame, score, buttons, languages } = mutable
  const { abortedGameMessage, stopGameButtonLabel, startGameButtonLabel } = texts

  const startNewGame = () => {
    dispatch({ type: START })
  }

  const stopGame = () => {
    dispatch({ type: STOP, payload: { message: abortedGameMessage } })
  }

  return (
    <>
      <Main>

        <LangMenu>
          {languages.map(({ short, whole, flagImg }) => {
            return <Flag key={short} src={flagImg} language={whole} dispatch={dispatch} short={short} />
          })}
        </LangMenu>

        <GameArea message={message}>
          <GenesisPad>
            {buttons.map(({ color, position, gradient, isLightOn }) => {
              return (
                <Pad
                  key={color}
                  color={color}
                  gradient={gradient}
                  isLightOn={isLightOn}
                  position={position}
                  allowClick={isClickAllowed}
                  dispatch={dispatch}
                />
              )
            })}
          </GenesisPad>
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
