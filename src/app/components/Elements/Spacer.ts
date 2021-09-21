import styled from 'styled-components/macro';

type SpacerProps = {
  /**
   * Have a vertical space
   */
  vertical?: boolean;
  /**
   * Have a horizontal space
   * @default true
   */
  horizontal?: boolean;
  /**
   * Size of space
   */
  size?: number;
};
const Spacer = styled.div``;

export default Spacer;
