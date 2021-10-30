import { useEffect, useState } from 'react';
import styled from 'styled-components';
import DigitalPanel from '../DigitalPanel';

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
  
  @media(max-width: 600px) {
    width: 18vh;
    height: 18vh;
    top: calc(50% - 9vh);
    right: calc(50% - 9vh);
   }
`;

const LabelContainer = styled.div`
  text-align: right;
  color: white;
`;

const calcHeight = () => {

  const windowHeight = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;

  const windowWidth = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;

  const factor = windowWidth < 600 ? 50 : 25;
  return windowHeight / factor;
};

export default function CenterPanel({ labels, level, score }) {
  const [height, setHeight] = useState(calcHeight());
  const [lastScore, setLastScore] = useState(0);

  useEffect(() => {
    window.addEventListener('resize', () => setHeight(calcHeight()));
  });

  useEffect(() => {
    if (lastScore !== score) setLastScore(lastScore + 1);
  }, [score])

  useEffect(() => {

    const scoreDiff = score - lastScore;
    const timeOut = Math.ceil(100 / (scoreDiff === 0 ? 100 : scoreDiff));
    const unsafeIncrement = Math.ceil(scoreDiff / 100);
    const safeIncrement = unsafeIncrement < 1 ? 1 : unsafeIncrement;
    const incrementedScore = lastScore + safeIncrement;
    const scoreToShow = incrementedScore > score ? score : incrementedScore;

    if (lastScore !== score) {
      setTimeout(() => {
        setLastScore(scoreToShow);
      }, timeOut);
    };

  }, [lastScore]);

  return (
    <StyledPanel>

      <div style={{ gridArea: '2 / 2 / 3 / 4' }}>
        <LabelContainer>
          <span>{labels.levelLabel}</span>
        </LabelContainer>
        <DigitalPanel
          number={level}
          digits='1'
          height={`${height}px`}
        />
      </div>

      <div style={{ gridArea: '4 / 2 / 5 / 4' }}>
        <LabelContainer>
          <span>{labels.scoreLabel}</span>
        </LabelContainer>
        <DigitalPanel
          number={lastScore}
          digits='6'
          height={`${height}px`}
        />
      </div>
    </StyledPanel>
  );
};
