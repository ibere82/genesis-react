import React from 'react'
import Pad from './Pad';
import styled from 'styled-components';
import DigitalPanel from './DigitalPanel';

const Wrapper = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: "center";
`

const MainGame = styled.div`
  position: absolute;
  top: 0;
  right: calc(50% - 48vh);
  border-radius: 100%;
  background: linear-gradient(60deg, black, gray);
  border: black 1px solid;
  width: 96vh;
  height: 96vh;
`

const GeniusPad = styled.div`
  position: absolute;
  top: calc(50% - 39vh);
  right: calc(50% - 39vh);
  display: grid;
  grid-template-areas: 
    'TopLeft TopRight'
    'BottomLeft BottomRight';
  grid-gap: 4vh;
  border-radius: 100%;
  width: 78vh;
  height: 78vh;
`

const Panel = styled.div`
  position: absolute;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  top: calc(50% - 19vh);
  right: calc(50% - 19vh);
  border-radius: 100%;
  width: 38vh;
  height: 38vh;
  background: linear-gradient(150deg, black, gray);
  border: black 1px solid;
  z-index: 2;

`

const TopMessageContainer = styled.div`
  position: absolute;
  height: auto;
  width: 60vh;
  top: calc(50% - 30vh);
  right: calc(50% - 31vh);
  z-index: 3;
  font-size: 32px;
  text-align: center;
  padding: 0.5rem;
  border-radius: 3px;
  opacity: 0.7;
`

export default function GameArea({ buttons, isClickAllowed, handleClick, message, onGame, startNewGame, stopGame, difficulty, score }) {


  const dinamicStyle =
    message !== '' ? { backgroundColor: 'white', } : {}

  return (
    <Wrapper>
      <MainGame>

        <GeniusPad>
          {buttons.map(({ color, position, note }, index) => {
            return (
              <Pad
                key={color}
                note={note}
                padColor={color}
                position={position}
                allowClick={isClickAllowed}
                handleClick={handleClick}
                bindRef={(ref) => buttons[index].ref = ref} />
            )
          })}


        </GeniusPad>
        <Panel>
          <div style={{ gridArea: '2 / 2 / 3 / 4' }}>
            <DigitalPanel
              label={'Nível'}
              number={difficulty}
              color='red'
              digits='1'
              height='20'
              measurementUnit='pt'
            />
          </div>
          <div style={{ gridArea: '4 / 2 / 5 / 4' }}>
            <DigitalPanel
              label={'Pontos'}
              number={score}
              color='red'
              digits='4'
              height='20'
              measurementUnit='pt'
            />
          </div>
          {/* <div style={{ gridArea: '6 / 2 / 7 / 4' }}>
            <Button handle={onGame ? stopGame : startNewGame} label={onGame ? 'Cancelar' : 'Iniciar'} />
          </div> */}

        </Panel>

      </MainGame>
      <TopMessageContainer
        style={dinamicStyle}>
        {message}
      </TopMessageContainer>
    </Wrapper>
  )
}
