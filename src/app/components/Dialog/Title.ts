/**
 * Title component for dialog
 */
import styled from 'styled-components/macro';
import { StyleConstants } from 'styles/StyleConstants';

const Title = styled.div`
  padding: 5px 20px;
  min-height: 55px;
  border-bottom: 1px solid ${StyleConstants.BORDER_COLOR};
  font-weight: 700;
  font-size: 1rem;
  display: flex;
  align-items: center;

  h3 {
    font-size: 1rem;
    margin: 0 0;
    flex: 1;
  }

  select {
    font-size: 0.9em !important;
  }
`;

export default Title;
