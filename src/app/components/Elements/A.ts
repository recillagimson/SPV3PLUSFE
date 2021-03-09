/**
 * Anchor Link
 * Styled <Link> from react-router-dom
 */
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import { StyleConstants } from 'styles/StyleConstants';

const A = styled(Link)`
  color: ${StyleConstants.LINK_TEXT_GOLD};
  transition: all 0.3s ease-in-out;
  text-decoration: none;

  &:hover {
    color: ${StyleConstants.LINK_TEXT_GOLD_HOVER};
  }
`;

export default A;
