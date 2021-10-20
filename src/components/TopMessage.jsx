import React from 'react'
import styled from 'styled-components';

const TopMessageContainer = styled.div`
  position: absolute;
  height: auto;
  width: 60vh;
  top: calc(50% - 30vh);
  right: calc(50% - 31vh);
  z-index: 3;
  font-size: 32px;
  text-align: center;
  padding: 0.5rem;
  border-radius: 3px;
  opacity: 0.7;
  ${({ message }) => message && 'background-color: white;'}
  
  @media(max-width: 800px) {
    font-size: 26px;
    width: 32vh;
    top: calc(50% - 14vh);
    right: calc(50% - 17vh);
   }
`;

export default function TopMessage({ message }) {

  return (
    <TopMessageContainer message={message}>{message}</TopMessageContainer>
  );
};
