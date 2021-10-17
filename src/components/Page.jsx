import React from 'react'

export default function Page({ onGame, stopGame, startNewGame, buttons, isClickAllowed, refMessage, handleClick }) {
  return (
    <>
      <main>
        <div>
          <button id="start" onClick={onGame ? stopGame : startNewGame} >{onGame ? 'Cancelar' : 'Iniciar'}</button>
          <p className="info-status"><span id="level">Nível: {difficulty}</span></p>
          <p className="info-status"><span id="score">Pontos: {score}</span></p>
        </div>

        <div className="wrapper">
          <div className="main-game">
            <div style={{
              display: 'grid',
              gridGap: '0.2rem',
              gridTemplateAreas: `'TopLeft TopRight'
                                'BottomLeft BottomRight'`,
              border: '1px solid #ffffff',
              backgroundColor: '#ffffff',
              borderRadius: '100%',
              width: '80vh',
              height: '80vh',
            }}>

              {buttons.map(({ color, position, note }, index) => {

                return (
                  <Pad
                    key={color}
                    note={note}
                    padColor={color}
                    position={position}
                    allowClick={isClickAllowed}
                    handleClick={handleClick}
                    bindRef={(ref) => buttons[index].ref = ref} />
                )

              })}

            </div>
          </div>
          <div id="top-message-container"><span ref={refMessage} id="message">Clique em Iniciar</span></div>
        </div>

        <div>
          <div style={{ display: 'flex' }}>
            <a target="_blank" rel="noreferrer" title="Iberê' s linkedin page"
              href="https://www.linkedin.com/in/iber%C3%AA-abondanza-kuhlmann-0691b32a/">
              <img className="icon" src="/icons/linkedin.png" alt="Iberê' s linkedin page" />
            </a>

            <a target="_blank" rel="noreferrer" title="Iberê' s github page" href="https://github.com/ibere82">
              <img className="icon" src="/icons/github.png" alt="Iberê' s github page" />
            </a>
          </div>
        </div>

      </main>
      <footer>
        <p>&copy;
          <a target="_blank" rel="noreferrer" href="https://github.com/ibere82">Iberê Abondanza Kuhlmann</a>
        </p>
        <p>Developed based on
          <a target="_blank" rel="noreferrer" href="https://github.com/SpruceGabriela/genesis-dio">
            this Gabriela Pinheiro's Repository</a> as a task for the Eduzz Fullstack Developer Bootcamp from
          <a target="_blank" rel="noreferrer" href="https://digitalinnovation.one/">DIO - Digital Inovation One</a>
        </p>
      </footer>



    </>

  )
}
