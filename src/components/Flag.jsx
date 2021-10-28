import React from 'react'
import styled from 'styled-components';
import { CHANGE_LANGUAGE } from '../state/actionsTypes';

const FlagContainer = styled.div`
  padding-left: 3px;
  padding-right: 3px;
  padding-top: 3px;
  :hover {
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 0px;
    
  }
`;

const StyledFlag = styled.img``;

export default function Flag({ src, language, dispatch, short }) {
  return (
    <FlagContainer onClick={() => dispatch({ type: CHANGE_LANGUAGE, payload: { lang: short } })}>
      <img
        src={src}
        alt={language}
        title={language}
        style={{ minWidth: '32px', maxWidth: '32px', minHeight: '24px', maxHeight: '24px' }} />
    </FlagContainer>
  )
}
