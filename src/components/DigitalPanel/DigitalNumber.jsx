// Original Svg created by potrace 1.15, written by Peter Selinger 2001-2017
// Adapted to a dynamic React Component by Iberê Abondanza Kuhlmann

const allPaths = [
  `M1385 12396 c-214 -222 -390 -408 -390 -414 0 -6 177 -193 394 -416 l394 -406
   1471 0 1471 1 420 400 c231 221 421 404 423 408 1 4 -184 192 -411 419 l-414 
   412 -1484 0 -1484 0 -390 -404z`,

  `M408 11066 l-408 -411 0 -1485 0 -1485 408 -396 409 -397 411 401
   412 400 0 1471 -1 1471 -400 420 c-220 231 -406 421 -412 421 -7 1 -195 -184
   -419 -410z`,

  `M5328 11066 l-408 -412 0 -1485 0 -1484 408 -397 409 -396 411 400
  412 401 0 1471 -1 1471 -400 420 c-220 231 -406 421 -412 421 -7 1 -195 -184
  -419 -410z`,

  `M1382 6814 c-216 -224 -392 -410 -390 -414 2 -5 180 -191 397 -414
  l394 -406 1471 0 1471 1 311 297 c171 163 362 346 424 405 l114 108 -415 415
  -414 414 -1485 0 -1485 0 -393 -406z`,

  `M413 5490 l-413 -417 0 -1484 0 -1484 401 -389 c220 -214 407 -389
  414 -390 7 0 196 176 419 393 l406 394 0 1471 -1 1471 -395 415 c-217 228
  -401 420 -407 426 -9 8 -118 -96 -424 -406z`,

  `M5333 5490 l-413 -417 0 -1484 0 -1484 406 -393 c223 -216 409 -392
  414 -390 5 2 192 180 415 397 l405 394 0 1471 -1 1471 -395 415 c-217 228
  -401 420 -407 426 -9 8 -117 -95 -424 -406z`,

  `M1382 1234 c-216 -223 -392 -410 -390 -414 2 -4 180 -191 397 -414
  l395 -406 1470 0 1471 1 325 311 c179 171 370 353 424 405 l99 94 -414 415
  -414 414 -1485 0 -1485 0 -393 -406z`
];

const pathsFromDigit = [
  { paths: [0, 1, 2, 4, 5, 6] },
  { paths: [2, 5] },
  { paths: [0, 2, 3, 4, 6] },
  { paths: [0, 2, 3, 5, 6] },
  { paths: [1, 2, 3, 5] },
  { paths: [0, 1, 3, 5, 6] },
  { paths: [0, 1, 3, 4, 5, 6] },
  { paths: [0, 2, 5] },
  { paths: [0, 1, 2, 3, 4, 5, 6] },
  { paths: [0, 1, 2, 3, 5, 6] },
];

export default function DigitalNumber({ digit = 0, color = 'red', width = '13pt', height = '26pt' }) {

  const pathsToShow = pathsFromDigit[digit].paths.map((path, key) => <path key={key} d={allPaths[path]} />)

  return (
    <div style={{ marginRight: '2px' }}>
      <svg
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 656 1280"
        preserveAspectRatio="xMidYMid meet"
      >
        <metadata>
          Created by potrace 1.15, written by Peter Selinger 2001-2017
        </metadata>

        <g
          transform="translate(0,1280) scale(0.1,-0.1)"
          stroke="none"
          fill={color}>

          {pathsToShow}

        </g>
      </svg>
    </div>
  );
};
