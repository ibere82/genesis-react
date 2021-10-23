import DigitalNumber from './DigitalNumber';

export default function DigitalPanel({
  number = 0,
  digits = 4,
  height = '26pt',
  color = 'red',
  backgroundColor = 'black',
  justifyContent = 'flex-end',
}) {
  const digitsArray = number.toString().padStart(digits, '0').split('')

  return (
    <div
      style={{
        display: 'flex',
        padding: `calc(${height} / 8)`,
        overflow: 'hidden',
        backgroundColor,
        justifyContent,
      }}
    >
      {digitsArray.map((digit, index) =>
        <DigitalNumber
          key={index}
          digit={digit}
          color={color}
          width={`calc(${height} / 2)`}
          height={`${height}`} />
      )}
    </div>

  );
};
