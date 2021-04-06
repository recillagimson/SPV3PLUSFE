/**
 * Icon Button
 * For use with the Font Awesome icons
 * @prop {string} size        'small' | 'medium' default: 'medium'
 * @prop {string} color       'primary' | 'secondary' | 'default'
 */
import styled from 'styled-components';
import { StyleConstants } from 'styles/StyleConstants';

type IconButtonProps = {
  size?: 'small' | 'medium';
  color?: 'primary' | 'secondary' | 'default';
};

const colors = {
  primary: StyleConstants.BUTTONS.primary.main,
  secondary: StyleConstants.BUTTONS.secondary.main,
  default: StyleConstants.BUTTONS.neutral.main,
};

const IconButton = styled.button<IconButtonProps>`
  width: ${p => (p.size === 'small' ? '26px' : '36px')};
  height: ${p => (p.size === 'small' ? '26px' : '36px')};
  line-height: ${p => (p.size === 'small' ? '28px' : '36px')};
  text-align: center;
  padding: 0 0;
  border: none;
  background-color: transparent;
  transition: 0.3s ease;
  border-radius: 50%;
  cursor: pointer;
  outline: 0;
  font-size: 0.9rem;
  background-color: ${p => (p.color ? colors[p.color] : colors['default'])};
  opacity: 0.7;

  &:hover,
  &:focus {
    /* background-color: ${StyleConstants.GRAY_BG};
    color: inherit; */
    opacity: 1;
  }
`;

export default IconButton;
