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

export default function Page({ dispatch, state }) {

  const languageMenu = state.languages.map(({ short, whole, flagImg }) =>
    <Flag
      key={short}
      src={flagImg}
      language={whole}
      dispatch={dispatch}
      short={short} />
  );

  const buttons = state.currentLevelOptions.buttons.map(({ color, position, gradient, isLightOn }) =>
    <Pad
      key={color}
      color={color}
      gradient={gradient}
      isLightOn={isLightOn}
      position={position}
      allowClick={state.isClickAllowed}
      dispatch={dispatch}
    />
  );

  const startNewGame = () => dispatch({ type: NEW_GAME })

  const stopGame = () => dispatch({ type: STOP, payload: { message: state.texts.abortedGameMessage } })

  return (
    <>
      <Main>
        <GameArea>
          <LangMenu>
            {languageMenu}
          </LangMenu>
          <PadsContainer>
            {buttons}
          </PadsContainer>
          <CenterPanel labels={state.texts} level={state.level} score={state.score} />
          <TopMessage message={state.message} />
          <IconsArea />
        </GameArea>
      </Main>
      <ButtonContainer>
        <StartPauseButton
          handle={state.onGame ? stopGame : startNewGame}
          label={state.onGame ? state.texts.stopGameButtonLabel : state.texts.startGameButtonLabel} />
      </ButtonContainer>
      <Footer />
    </>
  );
};
