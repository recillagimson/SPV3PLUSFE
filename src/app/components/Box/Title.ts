/** Box Title Component */
import styled from 'styled-components/macro';
import { StyleConstants } from 'styles/StyleConstants';

type TitleProps = {
  border?: boolean;
  hasbutton?: boolean;
};

const Title = styled.div<TitleProps>`
  align-self: flex-start;
  padding: ${p => (p.hasbutton ? '0 8px 0 25px' : '0 25px')};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  height: 65px;
  border-bottom: ${p =>
    p.border ? `1px solid ${StyleConstants.LIGHT_BORDER_COLOR}` : '0'};

  .bt-text {
    flex: 1;
  }
`;

export default Title;
