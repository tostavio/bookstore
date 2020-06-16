import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { theme } from 'src/shared/theme';

const ChevronDown: React.FC = () => {
  return (
    <Svg width="25" height="25" fill="none" viewBox="0 0 407.437 407.437">
      <Path
        fill={theme.colors.arrow}
        d="M386.258 91.567L203.718 273.512 21.179 91.567 0 112.815 203.718 315.87 407.437 112.815z"
      />
    </Svg>
  );
};

export default React.memo(ChevronDown);
