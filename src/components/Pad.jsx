import { useEffect, useState } from 'react';
import { EventInjector } from 'react-event-injector';
import * as Tone from 'tone';
import styled from 'styled-components';
import { CLICK, TURN_BUTTON_ON, TURN_BUTTON_OFF } from '../state/actionsTypes.js';


const synth = new Tone.AMSynth().toDestination();

const ColoredButton = styled.div`
  ${({ position, gradient, allowClick, isOn }) => {
    const [colorFrom, colorTo] = gradient;

    return `
      gridArea: ${position};
      box-sizing: border-box;
      border: black solid 2px;
      background: linear-gradient(${colorFrom}, ${colorTo});
      border-${position}-radius: 100%;
      cursor: ${allowClick ? 'pointer' : 'default'};
      opacity: ${isOn ? '1' : '0.5'};
      ${allowClick &&
      `:hover {
          border: black solid 1px;
        }`
      }
`}}`;

export default function Pad({ color, gradient, allowClick, position, dispatch, isLightOn }) {

  const handleMouseDown = () => {
    if (allowClick) dispatch({ type: TURN_BUTTON_ON, payload: { color } })
  };

  const handleMouseUp = () => {
    if (isLightOn) {
      dispatch({ type: TURN_BUTTON_OFF, payload: { color } })
      dispatch({ type: CLICK, payload: { color } })
    };
  };

  const handleTouchStart = (e) => {
    e.preventDefault();
    handleMouseDown();
  };

  return (
    <EventInjector
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleMouseUp}
      settings={{ passive: false }}
    >
      <ColoredButton position={position} gradient={gradient} allowClick={allowClick} isOn={isLightOn} />
    </EventInjector>
  );
};
