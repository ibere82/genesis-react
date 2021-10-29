import styled from 'styled-components';

const StyledPad = styled.div`
  position: absolute;
  top: calc(50% - 39vh);
  right: calc(50% - 39vh);
  display: grid;
  grid-template-areas: 
    'top-left top-right'
    'bottom-left bottom-right';
  grid-gap: 4vh;
  border-radius: 100%;
  width: 78vh;
  height: 78vh;

  @media(max-width: 800px) {
    grid-gap: 0.8vh;
    width: 38vh;
    height: 38vh;
    top: calc(50% - 19vh);
    right: calc(50% - 19vh);
   }
`;

export default function GenesisPad({ children }) {
  return (
    <StyledPad>
      {children.map(child => child)}
    </StyledPad>
  );
};
