import styled from 'styled-components/macro';
import { StyleConstants } from 'styles/StyleConstants';

type Props = {
  size?: 'small' | 'large';
};

const sizes = {
  small: '30px',
  large: '65px',
};

const fontSize = {
  small: '0.9rem',
  large: '1.5rem',
};

const CircleIndicator = styled.span<Props>`
  margin: 0;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  padding: 3px;
  line-height: 1;
  width: ${p => (p.size ? sizes[p.size] : '30px')};
  height: ${p => (p.size ? sizes[p.size] : '30px')};
  font-size: ${p => (p.size ? fontSize[p.size] : '0.9rem')};
  border-radius: 100px;
  text-align: center;
  color: #fff;
  background-color: ${StyleConstants.GOLD};
`;

export default CircleIndicator;
