import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { theme } from 'src/shared/theme';

const Arrow: React.FC = () => {
  return (
    <Svg width="25" height="25" fill="none" viewBox="0 0 20 11">
      <Path
        fill={theme.colors.arrow}
        fillRule="evenodd"
        d="M18.945 4.889H2.087l3.845-3.846A.611.611 0 105.068.18L.179 5.068a.611.611 0 00.002.865l4.887 4.888a.61.61 0 00.864 0 .611.611 0 000-.864L2.087 6.11h16.858a.611.611 0 000-1.222z"
        clipRule="evenodd"
      />
    </Svg>
  );
};

export default React.memo(Arrow);
