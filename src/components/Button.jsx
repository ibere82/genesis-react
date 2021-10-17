import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
  background-color: #4CAF50; /* Green */
  border: gray solid  1px;
  color: white;
  padding: 15px 32px;
  text-align: center;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  width: 120px;
  :hover{
    border: lightgrey solid  1px;
  }`

export default function Button({ handle, label }) {
  return (
    <StyledButton onClick={handle}>{label}</StyledButton>
  )
}

