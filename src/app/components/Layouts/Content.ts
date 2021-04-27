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

  ${media.medium`
    #appMain:not(.not-found) &.authenticated {
      margin-left: ${StyleConstants.SIDEBAR_WIDTH};
      min-height: calc(100vh - 65px);
    }
  `}
`;

export default Content;
