import Icon from './Icon';

export default function IconsArea() {
  return (
    <div>
      <div style={{ display: 'flex' }}>
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
        
      </div>
    </div>
  );
};
