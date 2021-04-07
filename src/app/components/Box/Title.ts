/** Box Title Component */
import styled from 'styled-components/macro';
import { StyleConstants } from 'styles/StyleConstants';

const Title = styled.div<{ border?: boolean }>`
  align-self: flex-start;
  padding: 25px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  border-bottom: ${p =>
    p.border ? `1px solid ${StyleConstants.LIGHT_BORDER_COLOR}` : '0'};

  .bt-text {
    flex: 1;
  }
`;

export default Title;
