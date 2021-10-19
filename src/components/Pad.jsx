import React, { useEffect, useState } from 'react';
import * as Tone from 'tone';
const synth = new Tone.AMSynth().toDestination();

export default function Pad({ color, gradient, allowClick, position, bindRef, note, handleClick }) {

  useEffect(() => {
    bindRef({ pulseButton, turnOn, turnOff });
  }, []);

  useEffect(() => {
    const newStyle = { ...style, cursor: allowClick ? 'pointer' : 'default' };
    setStyle(newStyle);
  }, [allowClick]);

  const [style, setStyle] = useState({
    gridArea: position,
    background: `linear-gradient(${gradient[0]}, ${gradient[1]})`,
    [`border${position}Radius`]: '100%',
    border: `black solid 0.2vh`,
    opacity: '0.5',
    cursor: 'default',
  });

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
    const newStyle = { ...style, opacity: '1' };
    setStyle(newStyle);
    synth.triggerAttack(note);
  };

  const turnOff = () => {
    const newStyle = { ...style, opacity: '0.5' };
    setStyle(newStyle);
    synth.triggerRelease();
  };

  const pulseButton = () => {
    turnOn();
    setTimeout(() => {
      turnOff();
    }, 200);
  };

  return (
    <div
      style={style}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
    >
    </div>
  );
};
