import { createGlobalStyle } from 'styled-components';
import { StyleConstants } from './StyleConstants';
import 'app/components/Assets/FontFace.css';

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
    font-weight: 500;
    line-height: 1.4;
    overflow-x: hidden;
    /* min-width: 420px; */

    /* Font Smoothing */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body.fontLoaded {
    font-family: 'Museo Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #appMain {
    min-height: 100%;
    min-width: 100%;

    &.not-found {
      background-color: #fff;
    }
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

  b,
  strong {
    font-weight: 700;
  }

  .f-small {
    font-size: 0.85rem !important;
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

  .text-red {
    color: ${StyleConstants.NEGATIVE} !important; 
  }
  .text-green {
    color: ${StyleConstants.POSITIVE} !important; 
  }
  .text-yellow {
    color: ${StyleConstants.GOLD} !important; 
  }

  /** margins */
  .ml-1{
    margin-left: 0.2em;
  }
  .ml-2{
    margin-left: 0.4em;
  }
  .ml-3{
    margin-left: 0.6em;
  }
  .ml-4{
    margin-left: 0.8em;
  }
  .ml-5{
    margin-left: 1em;
  }

  .mr-1{
    margin-right: 0.2em;
  }
  .mr-2{
    margin-right: 0.4em;
  }
  .mr-3{
    margin-right: 0.6em;
  }
  .mr-4{
    margin-right: 0.8em;
  }
  .mr-5{
    margin-right: 1em;
  }

  .fw-bold{
    font-weight: bold;
  }

  .iframe {
    & body {
      font-family: 'Museo Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }
  }
`;
