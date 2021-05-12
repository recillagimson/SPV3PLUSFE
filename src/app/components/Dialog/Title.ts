/**
 * Title component for dialog
 */
import styled from 'styled-components/macro';
import { StyleConstants } from 'styles/StyleConstants';

const Title = styled.div`
  padding: 15px;
  border-bottom: 1px solid ${StyleConstants.BORDER_COLOR};
  font-weight: 700;

  h3 {
    font-size: 1rem;
    margin: 0 0;
  }
`;

export default Title;
