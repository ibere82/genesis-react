import styled from 'styled-components';

const StyledImg = styled.img`
  display: inline-block;
  box-sizing: border-box;
  width: 48px;
  height: 48px;
  margin: 0.6rem;
  border-radius: 100%;
  :hover{
    border: lightgrey solid 1px;
  }
  `;

export default function Icon({ title, href, src }) {
 
  return (
    <a
      target="_blank"
      rel="noreferrer"
      title={title}
      href={href}
    >
      <StyledImg
        src={src}
        alt={title} />
    </a>
  );
};
