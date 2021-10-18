import React from 'react'
import DigitalNumber from './DigitalNumber'

export default function DigitalPanel({ label = '', number = 0, color = 'red', digits = 4, height = 26, measurementUnit = 'pt' }) {

  return (
    <>
    <div style={{textAlign: 'right', color: 'white'}}>
    <span>{label}</span>
    </div>

    <div
      style={{
        display: 'flex',
        backgroundColor: 'black',
        padding: '2px',
        justifyContent: 'flex-end'
      }}
    >
      {number.toString().padStart(digits, '0').split('').map(digit =>
        
          <DigitalNumber
            digit={digit}
            color={color}
            width={`${height / 2}${measurementUnit}`}
            height={`${height}${measurementUnit}`} />
        
      )}
    </div>
    </>
  )
}
