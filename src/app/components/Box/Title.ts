/** Box Title Component */
import styled from 'styled-components/macro';
import { StyleConstants } from 'styles/StyleConstants';

type TitleProps = {
  border?: boolean;
  hasbutton?: boolean;
};

const Title = styled.div<TitleProps>`
  align-self: flex-start;
  padding: ${p =>
    !p.border ? '20px 25px' : p.hasbutton ? '18px 10px 18px 25px' : '25px'};
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
