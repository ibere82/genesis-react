import React from 'react'
import Flag from './Flag'
import styled from 'styled-components'

const FlagContainer = styled.div`
  display: flex;
  margin-top: 15px;
  margin-left: '15px';
  max-width: 156px;
  min-width: 156px;
  min-height: 30px;
  max-height: 30px;
`;

export default function LangMenu({ children = [] }) {
  return (
    <FlagContainer>
      {children.map(child => child)}
    </FlagContainer>

  )
}
