import React from 'react';
import { Path, Svg } from 'react-native-svg';
import { theme } from 'src/shared/theme';

const Search: React.FC = () => {
  return (
    <Svg width="25" height="25" fill="none" viewBox="0 0 19 19">
      <Path
        d="M3.1 12.336a6.532 6.532 0 019.235-9.237A6.531 6.531 0 113.1 12.336zm15.726 5.65l-5.248-5.247c2.603-3.032 2.474-7.606-.4-10.478A7.72 7.72 0 102.26 13.177a7.715 7.715 0 0010.478.401l5.246 5.247h.001a.593.593 0 10.84-.839z"
        fill={theme.colors.search}
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </Svg>
  );
};

export default React.memo(Search);
