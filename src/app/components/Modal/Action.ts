/**
 * Wrapper for the Action buttons
 */
import styled from 'styled-components/macro';

const ActionWrapper = styled.div<{
  align?: 'center' | 'flex-start' | 'flex-end';
}>`
  padding: 5px 15px 20px;
  display: flex;
  align-items: center;
  justify-content: ${p => (p.align ? p.align : 'flex-end')};

  button,
  a {
    margin: 0 2px;
  }
`;

export default ActionWrapper;
