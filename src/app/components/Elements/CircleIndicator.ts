/**
 * Circle Indicator
 * @prop {string}   size        Option of small, medium, large (default: small)
 * @prop {string}   color       Option of primary, secondary, danger (default: primary)
 */
import styled from 'styled-components/macro';
import { StyleConstants } from 'styles/StyleConstants';

// Declare the props
type CircleIndicatorProps = {
  size?: 'small' | 'medium' | 'large' | undefined; // size of the circle
  color?: 'primary' | 'secondary' | 'danger' | undefined; // color set of the circle
};

// Define color, sizes and font size
const color = {
  primary: {
    text: StyleConstants.WHITE,
    bg: StyleConstants.BUTTONS.primary.main,
  },
  secondary: {
    text: StyleConstants.BUTTONS.secondary.textColor,
    bg: StyleConstants.BUTTONS.secondary.main,
  },
  danger: {
    text: StyleConstants.BUTTONS.danger.textColor,
    bg: StyleConstants.BUTTONS.danger.main,
  },
};
const sizes = {
  small: '30px',
  medium: '45px',
  large: '65px',
};
const fontSize = {
  small: '0.9rem',
  medium: '1.275rem',
  large: '1.85rem',
};

const CircleIndicator = styled.span<CircleIndicatorProps>`
  margin: 0;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3px;
  line-height: 1;
  width: ${p => (p.size ? sizes[p.size] : sizes['small'])};
  height: ${p => (p.size ? sizes[p.size] : sizes['small'])};
  font-size: ${p => (p.size ? fontSize[p.size] : fontSize['small'])};
  border-radius: 100px;
  text-align: center;
  color: ${p => (p.color ? color[p.color].text : StyleConstants.WHITE)};
  background-color: ${p =>
    p.color ? color[p.color].bg : StyleConstants.BUTTONS.primary.main};
`;

export default CircleIndicator;
