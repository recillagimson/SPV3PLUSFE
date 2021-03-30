/**
 * Wrapper for the Action buttons
 */
import styled from 'styled-components/macro';
import { StyleConstants } from 'styles/StyleConstants';
import { media } from 'styles/media';

const ActionWrapper = styled.div`
  padding: 10px 15px;
  border-top: 1px solid ${StyleConstants.BORDER_COLOR};
  text-align: center;

  button {
    margin: 0 2px;
  }

  ${media.small`
    text-align: right;
  `}
`;

export default ActionWrapper;
