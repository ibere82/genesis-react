import React from 'react'
import styled from 'styled-components'

const Link = styled.a`
  color: inherit;
  text-decoration: none;
`

export default function Footer() {

  return (
    <footer style={{borderTop: 'gray solid 2px', textAlign: 'center'}}>
      <p>&copy;
        <Link target="_blank" rel="noreferrer" href="https://github.com/ibere82">Iberê Abondanza Kuhlmann</Link>
      </p>
      <p>Developed based on
        <Link target="_blank" rel="noreferrer" href="https://github.com/SpruceGabriela/genesis-dio">
          this Gabriela Pinheiro's Repository</Link> as a task for the Eduzz Fullstack Developer Bootcamp from
        <Link target="_blank" rel="noreferrer" href="https://digitalinnovation.one/">DIO - Digital Inovation One</Link>
      </p>
    </footer>
  )
}
