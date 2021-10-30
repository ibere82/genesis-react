// Original Svg created by potrace 1.15, written by Peter Selinger 2001-2017
// Adapted to a dynamic react component by Iberê Abondanza Kuhlmann

import DigitalNumber from './DigitalNumber.jsx';

export default function DigitalPanel(props) {

  const {
    number = 0,
    digits = 4,
    height = '26pt',
    color = 'red',
    backgroundColor = 'black',
    justifyContent = 'flex-end',
  } = props;

  const containerStyle = {
    display: 'flex',
    padding: `calc(${height} / 8)`,
    overflow: 'hidden',
    backgroundColor,
    justifyContent,
  };

  const digitsArray = number.toString().padStart(digits, '0').split('');

  const Digits = digitsArray.map((digit, index) =>
    <DigitalNumber
      key={index}
      digit={digit}
      color={color}
      width={`calc(${height} / 2)`}
      height={`${height}`} />
  );

  return (
    <div style={containerStyle}>
      {Digits}
    </div>
  );
};
