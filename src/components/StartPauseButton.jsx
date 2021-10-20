import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: #4CAF50;
  border: gray solid 0.3vh;
  border-radius: 8px;
  color: white;
  text-align: center;
  display: inline-block;
  font-size: 18px;
  cursor: pointer;
  height: 60px;
  width: 100px;
  :hover{
    border: lightgrey solid 0.5vh;
  }
  
  @media(max-width: 800px) {
    height: 50px;
    width: 90px;
   }
   `;

export default function StartPauseButton({ handle, label }) {

  return <StyledButton onClick={handle}>{label}</StyledButton>;
};
