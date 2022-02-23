/**
 * Avatar styled components
 * @prop {string}   image       the image for the avatar
 * @prop {string}   size        string enum ('small' | 'medium' | 'large' | 'xxlarge') default: medium
 */
import styled from 'styled-components/macro';
import { StyleConstants } from 'styles/StyleConstants';

type Props = {
  image?: string;
  size?: 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge';
};

const sizes = {
  small: '24px',
  medium: '48px',
  large: '64px',
  xlarge: '104px',
  xxlarge: '215px',
};

const fontSize = {
  small: '12px',
  medium: '16px',
  large: '20px',
  xlarge: '28px',
  xxlarge: '40px',
};

const Avatar = styled.span<Props>`
  display: inline-block;
  vertical-align: middle;
  border-radius: 200px;
  min-width: ${p => (p.size ? sizes[p.size] : '48px')};
  min-height: ${p => (p.size ? sizes[p.size] : '48px')};
  width: ${p => (p.size ? sizes[p.size] : '48px')};
  height: ${p => (p.size ? sizes[p.size] : '48px')};
  background-image: ${p =>
    p.image
      ? `url(${p.image})`
      : `url("data:image/svg+xml,%3Csvg aria-hidden='true' focusable='false' data-prefix='fas' data-icon='user' class='svg-inline--fa fa-user fa-w-14' role='img' xmlns='https://www.w3.org/2000/svg' viewBox='0 0 448 512'%3E%3Cpath fill='gray' d='M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z'%3E%3C/path%3E%3C/svg%3E")`};
  background-color: ${StyleConstants.GRAY_BG};
  background-repeat: no-repeat;
  background-position: center;
  background-size: ${p => (p.image ? 'cover' : '50% auto')};
  font-size: ${p => (p.size ? fontSize[p.size] : '1rem')};
`;

export default Avatar;
