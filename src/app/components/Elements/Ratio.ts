import { css } from 'styled-components/macro';
import styled from 'styled-components/macro';

type Props = {
  size?: '1x1' | '4x3' | '16x9' | '21x9';
  fit?: string;
  radius?: string;
};

const oneBy1 = css<Props>`
  padding-top: 100%;
`;

const fourBy3 = css<Props>`
  padding-top: calc(3 / 4 * 100%);
`;

const sixteenBy9 = css<Props>`
  padding-top: calc(9 / 16 * 100%);
`;

const twentyoneBy9 = css<Props>`
  padding-top: calc(9 / 21 * 100%);
`;

const Ratio = styled.div<Props>`
  position: relative;
  width: 100%;

  &:before {
    display: block;
    content: '';
    ${p => p.size === '1x1' && oneBy1};
    ${p => p.size === '4x3' && fourBy3};
    ${p => p.size === '16x9' && sixteenBy9};
    ${p => p.size === '21x9' && twentyoneBy9};
  }

  & > * {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  img {
    width: 100%;
    object-fit: ${p => (p.fit ? p.fit : 'none')};
    border-radius: ${p => (p.radius ? p.radius : 'none')};
  }

  .circle {
    border-radius: 50%;
  }
`;

export default Ratio;
