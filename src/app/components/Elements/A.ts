import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import { StyleConstants } from 'styles/StyleConstants';

type AProps = {
  color?: 'default' | 'gold';
  underline?: string | undefined;
};

/**
 * Anchor Link
 * Styled <Link> from react-router-dom
 *
 * @typedef AProps;
 */
const A = styled(Link)<AProps>`
  color: ${p =>
    p.color === 'gold' ? StyleConstants.LINK_TEXT_GOLD : 'inherit'};
  transition: all 0.3s ease-in-out;
  text-decoration: ${p => (p.underline ? 'underline' : 'none')};

  &:hover {
    color: ${p =>
      p.color === 'gold' ? StyleConstants.LINK_TEXT_GOLD_HOVER : 'inherit'};
    opacity: 0.9;
    text-decoration: none;
  }
`;

export default A;
