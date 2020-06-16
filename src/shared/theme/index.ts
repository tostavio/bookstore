// my-theme.ts
import { DefaultTheme } from 'styled-components';
import { moderateScale } from 'react-native-size-matters';
import { Theme } from '@react-navigation/native/lib/typescript/src/types';

export const theme: DefaultTheme = {
  colors: {
    primary: '#FFDD0D',
    secondary: '#4A90E2',
    love: '#DC4B5D',
    textBold: '#2C2605',
    textNormal: '#4F565D',
    textDiscreet: '#9F8B0C',
    divider: '#F0D10F',
    input: '#E0C40D',
    white: '#FFF',
    starOn: '#4C4309',
    starOff: '#E4C81B',
    arrow: '#2C2605',
    search: '#2C2605',
  },
  fontFamily: 'Roboto',
  fontMetrics: {
    normal: {
      size: `${moderateScale(14)}px`,
      lineHeight: `${moderateScale(16)}px`,
    },
    large: {
      size: `${moderateScale(20)}px`,
      lineHeight: `${moderateScale(23)}px`,
    },
  },
  imageMetrics: {
    height: `${moderateScale(130)}px`,
    width: `${moderateScale(100)}px`,
  },
  header: {
    height: 70,
  },
};

export const navigatorTheme: Theme = {
  dark: false,
  colors: {
    primary: theme.colors.primary,
    background: theme.colors.primary,
    card: theme.colors.white,
    text: theme.colors.textNormal,
    border: theme.colors.divider,
  },
};
