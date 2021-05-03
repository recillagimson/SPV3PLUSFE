/**
 * Icon Button
 * For use with the Font Awesome icons
 * @prop {string} size        'small' | 'medium' default: 'medium'
 * @prop {string} color       'primary' | 'secondary' | 'default'
 */
import styled from 'styled-components/macro';
import { StyleConstants } from 'styles/StyleConstants';

type IconButtonProps = {
  size?: 'small' | 'medium';
  color?: 'primary' | 'secondary' | 'default';
};

const colors = {
  primary: {
    bg: StyleConstants.BUTTONS.primary.main,
    text: StyleConstants.BUTTONS.primary.textColor,
  },
  secondary: {
    bg: StyleConstants.BUTTONS.secondary.main,
    text: StyleConstants.BUTTONS.secondary.textColor,
  },
  default: {
    bg: 'transparent',
    text: StyleConstants.BUTTONS.neutral.textColor,
  },
};

const IconButton = styled.button<IconButtonProps>`
  width: ${p => (p.size === 'small' ? '26px' : '36px')};
  height: ${p => (p.size === 'small' ? '26px' : '36px')};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  transition: 0.3s ease;
  border-radius: 50%;
  cursor: pointer;
  outline: 0;
  font-size: 0.9rem;
  background-color: ${p =>
    p.color ? colors[p.color].bg : colors['default'].bg};
  color: ${p => (p.color ? colors[p.color].text : colors['default'].text)};
  opacity: 0.7;

  &:focus {
    box-shadow: 0 0 2px 2px ${StyleConstants.FOCUS_COLOR};
  }
  &:hover {
    /* background-color: ${StyleConstants.GRAY_BG};
    color: inherit; */
    opacity: 1;
  }
`;

export default IconButton;
