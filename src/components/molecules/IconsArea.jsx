import styled from 'styled-components';
import Icon from '../atoms/Icon';

const IconsContainer = styled.div`
  display: flex;
  margin-top: 5px;
  margin-right: 5px;
  max-width: 150px;
  min-width: 150px;
  min-height: 50px;
  max-height: 50px;
`;

export default function IconsArea() {
  return (

    <IconsContainer>
      <Icon
        title={"Iberê' s linkedin page"}
        src={"/icons/linkedin.png"}
        href={"https://www.linkedin.com/in/iber%C3%AA-abondanza-kuhlmann-0691b32a/"}
      />

      <Icon
        title={"Iberê' s github page"}
        src={"/icons/github.png"}
        href={"https://github.com/ibere82"}
      />
    </IconsContainer>

  );
};
