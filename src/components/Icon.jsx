import React from 'react'

export default function Icon({ title, href, src }) {
 const style={
  width: '68px',
  height: '68px',
  padding: '0.6rem',
 }
 
  return (
    <a
      target="_blank"
      rel="noreferrer"
      title={title}
      href={href}
      
      >
      <img
        style={style}
        src={src}
        alt={title} />
    </a>
  )
}
