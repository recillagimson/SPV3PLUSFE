import styled from 'styled-components/macro';
import { StyleConstants } from 'styles/StyleConstants';

const Content = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  &.authenticated {
    background-color: ${StyleConstants.BODY_COLOR};
    margin-left: ${StyleConstants.SIDEBAR_WIDTH};
    padding: 30px;
  }
`;

export default Content;
