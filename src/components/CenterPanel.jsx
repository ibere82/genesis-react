import React from 'react'
import styled from 'styled-components';
import DigitalPanel from './DigitalPanel';

const StyledPanel = styled.div`
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
`;

export default function CenterPanel({difficulty, score}) {
  return (
    <StyledPanel>
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
        digits='5'
        height='20'
        measurementUnit='pt'
      />
    </div>
  </StyledPanel>
  )
}
