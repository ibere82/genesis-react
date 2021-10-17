import React from 'react'

export default function LabelStatus({label, value}) {
  return (
    <p style={{textAlign: 'left'}}><span id="level">{label}: {value}</span></p>
  )
}
