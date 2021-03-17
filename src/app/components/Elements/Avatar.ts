/**
 * Avatar styled components
 * @prop {string}   image       the image for the avatar
 * @prop {string}   size        string enum ('small' | 'medium' | 'large') default: medium
 */
import styled from 'styled-components/macro';

type Props = {
  image?: string;
  size?: 'small' | 'medium' | 'large';
};

const sizes = {
  small: '45px',
  medium: '65px',
  large: '110px',
};

const Avatar = styled.span<Props>`
  display: inline-block;
  vertical-align: middle;
  border-radius: 200px;
  width: ${p => (p.size ? sizes[p.size] : '80px')};
  height: ${p => (p.size ? sizes[p.size] : '80px')};
  background-image: ${p => (p.image ? `url(${p.image})` : 'none')};
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

export default Avatar;
