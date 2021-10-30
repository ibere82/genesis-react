import styled from 'styled-components';
import { CHANGE_LANGUAGE } from '../../state/actionsTypes';

const StyledFlag = styled.img`
  padding-left: 3px;
  padding-right: 3px;
  padding-top: 3px;
  cursor: pointer;
  min-width: 32px;
  max-width: 32px;
  min-height: 24px;
  max-height: 24px;
  :hover {
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 0px;
  }
`;

export default function Flag({ src, language, dispatch, short }) {
  return (
    <StyledFlag
      onClick={() => dispatch({ type: CHANGE_LANGUAGE, payload: { lang: short } })}
      src={src}
      alt={language}
      title={language}
    />
  );
};
