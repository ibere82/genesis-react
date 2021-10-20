import React, { useEffect, useState } from 'react';
import { EventInjector } from 'react-event-injector';
import * as Tone from 'tone';
import styled from 'styled-components';

const ColoredButton = styled.div`
  ${({ position, gradient, allowClick, isOn }) => {
    const [colorFrom, colorTo] = gradient;

    return `
      gridArea: ${position};
      border: black solid 0.2vh;
      background: linear-gradient(${colorFrom}, ${colorTo});
      border-${position}-radius: 100%;
      cursor: ${allowClick ? 'pointer' : 'default'};
      opacity: ${isOn ? '1' : '0.5'};
`}}`;

const synth = new Tone.AMSynth().toDestination();

export default function Pad({ color, gradient, allowClick, position, bindRef, note, handleClick }) {

  const [lightStatus, setLightStatus] = useState(false);

  useEffect(() => {
    bindRef({ pulseButton, turnOn, turnOff });
  }, []);

  const handleMouseDown = () => {
    if (allowClick) turnOn();
  };

  const handleMouseUp = () => {
    if (allowClick) {
      turnOff();
      handleClick(color);
    };
  };

  const turnOn = () => {
    setLightStatus(true)
    synth.triggerAttack(note);
  };

  const turnOff = () => {
    setLightStatus(false)
    synth.triggerRelease();
  };

  const pulseButton = () => {
    turnOn();
    setTimeout(() => {
      turnOff();
    }, 200);
  };

  const handleTouch = (e) => {
    e.preventDefault();
    handleMouseDown();
  };

  return (
    <EventInjector
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouch}
      onTouchEnd={handleMouseUp}
      settings={{ passive: false }}
    >
      <ColoredButton position={position} gradient={gradient} allowClick={allowClick} isOn={lightStatus} />
    </EventInjector>
  );
};
