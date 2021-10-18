import React from 'react'

export default function LabelStatus({ label, value }) {
  return (
    <div >
      <p style={{ textAlign: 'right', fontSize: '48px' }}>{label}{value}</p>
    </div>
  )
}
