import React from 'react'
import Button from './Button';
import Footer from './Footer';
import GameArea from './GameArea';
import IconsArea from './IconsArea';

export default function Page({ onGame, stopGame, startNewGame, buttons, isClickAllowed, handleClick, difficulty, score, message }) {
  return (
    <>
      <main style={{ display: 'flex', padding: '20px' }}>
        <GameArea
          onGame={onGame}
          startNewGame={startNewGame}
          stopGame={stopGame}
          difficulty={difficulty}
          score={score}
          buttons={buttons}
          isClickAllowed={isClickAllowed}
          handleClick={handleClick}
          message={message}
        />
        <IconsArea />
      </main>
      <div style={{ position: 'absolute', bottom: '15vh', right: '15vh' }}>
      <Button handle={onGame ? stopGame : startNewGame} label={onGame ? 'Cancelar' : 'Iniciar'} />
      </div>
      <Footer />
    </>

  )
}
