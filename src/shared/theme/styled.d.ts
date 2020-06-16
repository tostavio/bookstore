import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      love: string;
      textBold: string;
      textNormal: string;
      textDiscreet: string;
      divider: string;
      input: string;
      white: string;
      starOn: string;
      starOff: string;
      arrow: string;
      search: string;
    };
    fontFamily: 'Roboto';
    fontMetrics: {
      normal: {
        size: string;
        lineHeight: string;
      };
      large: {
        size: string;
        lineHeight: string;
      };
    };
    imageMetrics: {
      height: string;
      width: string;
    };
    header: {
      height: number;
    };
  }
}
