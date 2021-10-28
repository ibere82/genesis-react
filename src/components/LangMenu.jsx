import React from 'react'
import Flag from './Flag'

export default function LangMenu({ langs, dispatch }) {
  return (
    <div style={{ display: 'flex', marginTop: '15px', marginLeft: '15px', maxWidth: '156px', minWidth: '156px'}}>
      {langs.map(({ short, whole, flagImg }) => {
        return <Flag key={short} src={flagImg} language={whole} dispatch={dispatch} short={short}/>
      })}
    </div>
  )
}
