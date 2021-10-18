import React from 'react'
import styled from 'styled-components'

const Link = styled.a`
  color: inherit;
  text-decoration: none;
`

export default function Footer() {

  return (
    <footer style={{ borderTop: 'gray solid 2px', textAlign: 'center' }}>
      <p>&copy;&nbsp;
        <Link target="_blank" rel="noreferrer" href="https://github.com/ibere82" title={"Iberê' s linkedin page"}>
          Iberê Abondanza Kuhlmann
        </Link>
      </p>
      <p>Developed based on&nbsp;
        <Link target="_blank" rel="noreferrer" href="https://github.com/SpruceGabriela/genesis-dio">
          Gabriela Pinheiro's original project
        </Link>
        &nbsp;as a task for the Eduzz Fullstack Developer Bootcamp from&nbsp;
        <Link target="_blank" rel="noreferrer" href="https://digitalinnovation.one/">DIO - Digital Inovation One</Link>
      </p>
      <p>Icons made by&nbsp;
        <Link target='_blank' href="https://www.freepik.com" title="Freepik">Freepik</Link> from&nbsp;
        <Link target='_blank' href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</Link></p>
      <p>SVG created by potrace 1.15, written by Peter Selinger 2001-2017 available on&nbsp;
        <Link target="_blank" rel="noreferrer" title={'SVG Silh'} href={'https://svgsilh.com/pt/image/39747.html'}>SVG Silh</Link>
      </p>
    </footer>
  )
}
