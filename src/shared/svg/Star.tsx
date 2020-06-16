import React from 'react';
import { Path, Svg } from 'react-native-svg';
import { theme } from 'src/shared/theme';

interface Props {
  fill?: string;
}
const Star: React.FC<Props> = ({ fill = theme.colors.starOff }) => {
  return (
    <Svg width="14" height="14" fill="none" viewBox="0 0 14 14">
      <Path
        fill={fill}
        fillRule="evenodd"
        d="M7 0L4.837 4.383 0 5.086l3.5 3.412-.826 4.817L7 11.04l4.326 2.275-.826-4.817L14 5.086l-4.837-.703L7 0z"
        clipRule="evenodd"
      />
    </Svg>
  );
};

export default React.memo(Star);
