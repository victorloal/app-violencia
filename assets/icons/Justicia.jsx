import * as React from "react";
import Svg, { Defs, Path } from "react-native-svg";
const SvgComponent = ({ fill = "#7ED842", ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    id="Capa_1"
    data-name="Capa 1"
    viewBox="0 0 444.29 300"
    {...props}
  >
    <Defs></Defs>
    <Path
      d="M222.14 19.21A130.79 130.79 0 1 0 352.93 150 130.94 130.94 0 0 0 222.14 19.21m0 244.14A113.35 113.35 0 1 1 335.49 150a113.48 113.48 0 0 1-113.35 113.35"
      fill={fill}
    />
    <Path
      d="m258.7 153.43-2.55 2.57-40-40 2.56-2.56a8.72 8.72 0 1 0-12.33-12.33L189 118.55a8.72 8.72 0 0 0 12.33 12.33l2.55-2.56 13.83 13.83-37.43 37.43a8.72 8.72 0 1 0 12.33 12.33L230 154.48l13.83 13.83-2.56 2.55a8.72 8.72 0 0 0 12.33 12.34l17.4-17.44a8.72 8.72 0 1 0-12.33-12.33"
      fill={fill}
    />
  </Svg>
);
export default SvgComponent;
