import styled from 'styled-components';
import DigitalPanel from './DigitalPanel';

const StyledPanel = styled.div`
  position: absolute;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  top: calc(50% - 19vh);
  right: calc(50% - 19vh);
  border-radius: 100%;
  width: 38vh;
  height: 38vh;
  background: linear-gradient(150deg, black, gray);
  border: black 1px solid;
  z-index: 2;
  
  @media(max-width: 800px) {
    width: 18vh;
    height: 18vh;
    top: calc(50% - 9vh);
    right: calc(50% - 9vh);
   }
`;

export default function CenterPanel({ level, score }) {

  const height = window.matchMedia("(min-width: 1000px)").matches ? '20pt' : '8pt'

  return (
    <StyledPanel>

      <div style={{ gridArea: '2 / 2 / 3 / 4' }}>
        <div style={{ textAlign: 'right', color: 'white' }}>
          <span>Nível</span>
        </div>
        <DigitalPanel
          number={level}
          color='red'
          digits='1'
          height={height}
        />
      </div>

      <div style={{ gridArea: '4 / 2 / 5 / 4' }}>
        <div style={{ textAlign: 'right', color: 'white' }}>
          <span>Pontos</span>
        </div>
        <DigitalPanel
          number={score}
          color='red'
          digits='5'
          height={height}
        />
      </div>
    </StyledPanel>
  );
};
