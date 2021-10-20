import React from 'react'
import styled from 'styled-components';
import Pad from './Pad';

const StyledPad = styled.div`
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

  @media(max-width: 800px) {
    grid-gap: 0.8vh;
    width: 38vh;
    height: 38vh;
    top: calc(50% - 19vh);
    right: calc(50% - 19vh);
   }
`;

export default function GenesisPad({buttons, isClickAllowed, handleClick}) {
  return (
    <StyledPad>
    {buttons.map(({ color, position, note, gradient }, index) => {
      return (
        <Pad
          key={color}
          color={color}
          note={note}
          gradient={gradient}
          position={position}
          allowClick={isClickAllowed}
          handleClick={handleClick}
          bindRef={(ref) => buttons[index].ref = ref} />
      )
    })}
  </StyledPad>
  );
};
