import React from 'react'
import LabelStatus from './LabelStatus';
import Button from './Button';
import Footer from './Footer';
import GameArea from './GameArea';
import IconsArea from './IconsArea';

export default function Page({ onGame, stopGame, startNewGame, buttons, isClickAllowed, refMessage, handleClick, difficulty, score, message }) {
  return (
    <>
      <main style={{ display: 'flex', padding: '20px' }}>
        <div>
          <Button handle={onGame ? stopGame : startNewGame} label={onGame ? 'Cancelar' : 'Iniciar'} />
          <LabelStatus label={'Nível'} value={difficulty} />
          <LabelStatus label={'Pontos'} value={score} />
        </div>
        <GameArea
          buttons={buttons}
          isClickAllowed={isClickAllowed}
          handleClick={handleClick}
          message={message}
        />
        <IconsArea />
      </main>
      <Footer />
    </>

  )
}
