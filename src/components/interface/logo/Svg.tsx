import { color as colorConfig } from '../../../config/color.config';

interface Props {
  color?: string;
}

function Svg({ color }: Props) {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 45.4 45.4"
      fill={color ? color : colorConfig}
    >
      <g>
        <g>
          <polygon points="24.3,22.4 26.3,18.5 30.2,10.7 25.3,10.7 17.3,15.6 20.7,22.4 		" />
          <polygon points="14.6,10.7 16.6,14.6 20.4,22.4 12.7,22.4 4.9,22.4 8.8,14.6 10.7,10.7 		" />
          <polygon points="34.7,10.7 36.7,14.6 40.6,22.4 32.8,22.4 25,22.4 28.9,14.6 30.8,10.7 		" />
          <g>
            <polygon points="24.7,23.1 22.7,26.9 18.8,34.7 26.6,34.7 34.4,34.7 30.5,26.9 28.6,23.1 			" />
            <polygon points="14.3,34.7 12.3,30.8 8.4,23.1 16.2,23.1 24,23.1 15.2,40.6 11.4,40.6 			" />
          </g>
        </g>
      </g>
    </svg>
  );
}

export default Svg;
