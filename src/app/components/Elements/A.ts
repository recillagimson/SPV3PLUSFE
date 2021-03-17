/**
 * Anchor Link
 * Styled <Link> from react-router-dom
 * @prop {string} color       one of 'default' | 'gold'
 */
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import { StyleConstants } from 'styles/StyleConstants';

type Props = {
  color?: 'default' | 'gold';
};

const A = styled(Link)<Props>`
  color: ${p =>
    p.color === 'gold' ? StyleConstants.LINK_TEXT_GOLD : 'inherit'};
  transition: all 0.3s ease-in-out;

  &:hover {
    /* color: ${StyleConstants.LINK_TEXT_GOLD_HOVER}; */
    opacity: 0.9;
    text-decoration: none;
  }
`;

export default A;
