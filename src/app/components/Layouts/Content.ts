import styled from 'styled-components/macro';
import { media } from 'styles/media';
import { StyleConstants } from 'styles/StyleConstants';

const Content = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  #appMain:not(.not-found) &.authenticated {
    background-color: ${StyleConstants.BODY_COLOR};
    padding: 30px 0 0;
  }

  .agreement {
    input[type='checkbox'],
    span {
      display: inline-block;
      vertical-align: top;
    }

    input[type='checkbox'] {
      cursor: pointer;
    }

    a {
      text-decoration: underline;
      color: inherit;
      transition: all 0.3s ease;

      &:hover {
        text-decoration: none;
      }
    }
  }

  .btn-resend-code {
    color: inherit;
    transition: all 0.3s ease-in-out;
    text-decoration: underline;
    border: 0;
    outline: 0;
    padding: 0;
    margin: 0;
    background-color: transparent;
    cursor: pointer;
    font-size: inherit;
    font-family: inherit;

    &:hover {
      opacity: 0.9;
      text-decoration: none;
    }
  }

  ${media.medium`
    #appMain:not(.not-found) &.authenticated {
      margin-left: ${StyleConstants.SIDEBAR_WIDTH};
      min-height: calc(100vh - 65px);
    }
  `}
`;

export default Content;
