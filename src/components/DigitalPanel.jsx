import React from 'react';
import DigitalNumber from './DigitalNumber';

export default function DigitalPanel({ label = '', number = 0, color = 'red', digits = 4, height = 26, measurementUnit = 'pt' }) {
  const digitsArray = number.toString().padStart(digits, '0').split('')
 
  return (
    <>
      <div style={{ textAlign: 'right', color: 'white' }}>
        <span>{label}</span>
      </div>

      <div
        style={{
          display: 'flex',
          backgroundColor: 'black',
          padding: `${height/10}px`,
          justifyContent: 'flex-end'
        }}
      >
        {digitsArray.map((digit, index) =>

          <DigitalNumber
            key={index}
            digit={digit}
            color={color}
            width={`${height / 2}${measurementUnit}`}
            height={`${height}${measurementUnit}`} />

        )}
      </div>
    </>
  );
};
