import { createGlobalStyle } from 'styled-components';
import { StyleConstants } from './StyleConstants';

export const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    background: #fff;
    color: ${StyleConstants.MAIN_TEXT};
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.4;
    overflow-x: hidden;
    /* min-width: 420px; */

    /* Font Smoothing */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body.fontLoaded {
    font-family: 'Merriweather Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #appMain {
    min-height: 100%;
    min-width: 100%;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  ::-ms-input-placeholder {
    color: #777;
  }
  :-ms-input-placeholder {
    color: #777;
  }
  ::placeholder {
    color: #777;
    opacity: 1;
  }

  /** Text Alignments */
  .text-left {
    text-align: left;
  }
  .text-right {
    text-align: right;
  }
  .text-center {
    text-align: center;
  }
  .text-justify {
    text-align: justify;
  }
`;
