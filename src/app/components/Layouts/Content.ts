import styled from 'styled-components/macro';
import { media } from 'styles/media';
import { StyleConstants } from 'styles/StyleConstants';

const Content = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  &.authenticated {
    background-color: ${StyleConstants.BODY_COLOR};
    padding: 30px;
  }

  ${media.medium`
    &.authenticated {
      margin-left: ${StyleConstants.SIDEBAR_WIDTH};
    }
  `}
`;

export default Content;
