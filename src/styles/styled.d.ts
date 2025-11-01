import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: {
        50: string;
        100: string;
        500: string;
        600: string;
        700: string;
      };
      purple: {
        100: string;
        400: string;
        500: string;
        600: string;
        700: string;
      };
      green: {
        50: string;
        100: string;
        600: string;
        700: string;
      };
      red: {
        100: string;
        500: string;
        600: string;
        700: string;
      };
      gray: {
        50: string;
        100: string;
        200: string;
        300: string;
        400: string;
        600: string;
        700: string;
        900: string;
      };
      white: string;
      orange: {
        400: string;
        500: string;
        600: string;
      };
      amber: {
        400: string;
      };
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      '2xl': string;
    };
    borderRadius: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
      full: string;
    };
    shadows: {
      sm: string;
      md: string;
      lg: string;
    };
    breakpoints: {
      md: string;
      lg: string;
    };
  }
}


