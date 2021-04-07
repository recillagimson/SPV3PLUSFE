/** Box footer wrapper */
import styled from 'styled-components/macro';
import { StyleConstants } from 'styles/StyleConstants';

const FooterAction = styled.div<{ border?: boolean; align?: string }>`
  align-self: flex-end;
  padding: ${p => (!p.border ? '5px 10px' : '10px')};
  text-align: ${p => (p.align ? p.align : 'left')};
  border-top: ${p =>
    p.border ? `1px solid ${StyleConstants.LIGHT_BORDER_COLOR}` : '0'};

  & > * {
    margin: 0 5px;
  }
`;

export default FooterAction;
