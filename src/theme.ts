import {extendTheme} from 'native-base';

const theme = extendTheme({
  colors: {
    pri: {
      50: '#c9cacf',
      100: '#bcbdc2',
      150: '#afb0b6',
      200: '#a1a3aa',
      250: '#94969e',
      300: '#878892',
      350: '#797b86',
      400: '#6d6f78',
      450: '#61636b',
      500: '#55565e',
      550: '#494a50',
      600: '#3f4045',
      650: '#3d3e43',
      700: '#303136',
      750: '#242528',
      800: '#18191b',
      850: '#0c0c0d',
    },
    sec: {
      50: '#c6c5d3',
      100: '#b8b6c8',
      150: '#aaa8bd',
      200: '#9c99b2',
      250: '#8e8ba7',
      300: '#7f7c9c',
      350: '#716e91',
      400: '#666383',
      450: '#5b5874',
      500: '#4f4d66',
      550: '#444257',
      600: '#413f54',
      650: '#393749',
      700: '#2d2c3a',
      750: '#22212c',
      800: '#17161d',
      850: '#0b0b0f',
    },
    third: {
      50: '#dfdeed',
      100: '#cfcee4',
      150: '#bfbddb',
      200: '#afadd2',
      250: '#9f9cc9',
      300: '#8f8cc0',
      350: '#7f7bb7',
      400: '#6f6bae',
      450: '#5f5ba4',
      500: '#5f5aa2',
      550: '#565194',
      600: '#4c4884',
      650: '#433f73',
      700: '#393663',
      750: '#302d52',
      800: '#262442',
      850: '#1d1b31',
      900: '#131221',
    },
    fourth: {
      50: '#dae2f1',
      100: '#c7d4ea',
      150: '#b5c6e3',
      200: '#a2b7dd',
      250: '#8fa9d6',
      300: '#7d9bcf',
      350: '#6a8cc8',
      400: '#577ec1',
      450: '#4570ba',
      500: '#3e65a8',
      550: '#375995',
      600: '#355691',
      650: '#304e82',
      700: '#294370',
      750: '#22385d',
      800: '#1c2d4a',
      850: '#152238',
      900: '#0e1625',
    },
    fifth: {
      50: '#b9acb7',
      100: '#ad9fab',
      150: '#a1919f',
      200: '#958393',
      250: '#8a7587',
      300: '#7c6a79',
      350: '#6e5e6c',
      400: '#60525e',
      450: '#534651',
      500: '#453b43',
      550: '#372f36',
      600: '#30292f',
      650: '#292328',
      700: '#1c171b',
      750: '#0e0c0d',
    },
  },
  breakpoints: {
    base: 0,
    sm: 480,
    md: 768,
    lg: 992,
    xl: 1280,
  },
  config: {initialColorMode: 'dark'},
});

export default theme;
