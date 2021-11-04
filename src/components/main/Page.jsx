import styled from 'styled-components';
import { NEW_GAME, STOP, } from '../../state/actionsTypes.js';
import Footer from './Footer';
import LangMenu from '../wrappers/LangMenu';
import GameArea from '../wrappers/GameArea';
import IconsArea from '../molecules/IconsArea';
import CenterPanel from '../molecules/CenterPanel';
import Flag from '../atoms/Flag';
import Pad from '../atoms/Pad';
import StartPauseButton from '../atoms/StartPauseButton';
import TopMessage from '../atoms/TopMessage';

const Main = styled.main`
  display: flex;
  padding: 20px;
`;

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 40px;
  right: 40px;
  @media(max-width: 600px) {
    right: calc(50% - 45px);
  }
`;

const PadsContainer = styled.div`
  position: absolute;
  top: calc(50% - 39vh);
  right: calc(50% - 39vh);
  display: grid;
  grid-template-areas: 
    'top-left top-right'
    'bottom-left bottom-right';
  grid-gap: 4vh;
  border-radius: 100%;
  width: 78vh;
  height: 78vh;

@media(max-width: 600px) {
  grid-gap: 0.8vh;
  width: 38vh;
  height: 38vh;
  top: calc(50% - 19vh);
  right: calc(50% - 19vh);
 }
`;

export default function Page({ dispatch, currentState }) {

  const {
    buttons,
    languages,
    isClickAllowed,
    level,
    score,
    message,
    onGame,
    abortedGameMessage,
    stopGameButtonLabel,
    startGameButtonLabel,
    levelLabel,
    scoreLabel,
  } = currentState;

  const LanguageMenu = languages.map(({ short, whole, flagImg }) =>
    <Flag
      key={short}
      src={flagImg}
      language={whole}
      dispatch={dispatch}
      short={short} />
  );

  const Buttons = buttons.map(({ color, position, gradient, isLightOn }) =>
    <Pad
      key={color}
      color={color}
      gradient={gradient}
      isLightOn={isLightOn}
      position={position}
      allowClick={isClickAllowed}
      dispatch={dispatch}
    />
  );

  const startNewGame = () => dispatch({ type: NEW_GAME });

  const stopGame = () => dispatch({ type: STOP, payload: { message: abortedGameMessage } });

  return (
    <>
      <Main>
        <GameArea>
          <LangMenu>
            {LanguageMenu}
          </LangMenu>
          <PadsContainer>
            {Buttons}
          </PadsContainer>
          <CenterPanel labels={{levelLabel, scoreLabel}} level={level} score={score} />
          <TopMessage message={message} />
          <IconsArea />
        </GameArea>
      </Main>
      <ButtonContainer>
        <StartPauseButton
          handle={onGame ? stopGame : startNewGame}
          label={onGame ? stopGameButtonLabel : startGameButtonLabel} />
      </ButtonContainer>
      <Footer />
    </>
  );
};
