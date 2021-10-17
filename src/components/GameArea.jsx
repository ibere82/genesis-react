import React from 'react'
import Pad from './Pad';
import styled from 'styled-components';

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
  right: calc(50% - 45vh);
`
const GeniusPad = styled.div`
  display: grid;
  grid-template-areas: 
    'TopLeft TopRight'
    'BottomLeft BottomRight';
  grid-gap: 5vh;
  border: 3vh solid black;
  background: linear-gradient(black, gray);
  border-radius: 100%;
  width: 90vh;
  height: 90vh;
`

const TopMessageContainer = styled.div`
  position: absolute;
  height: auto;
  width: 70vh;
  top: calc(50% - 20vh);
  right: calc(50% - 35vh);
  z-index: 2;
  font-size: 32px;
  text-align: center;
  padding: 0.5rem;
  border-radius: 3px;
  opacity: 0.7;
`

export default function GameArea({ buttons, isClickAllowed, handleClick, refMessage, message }) {


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
      </MainGame>
      <TopMessageContainer
        style={dinamicStyle}>
        {message}
      </TopMessageContainer>
    </Wrapper>
  )
}
