/**
 * Renders SquidPay Logo
 * @prop {boolean}  isInline  if render the image inlined with the content (default: block)
 * @prop {enum}     size      Selection of small, medium, large
 */
import * as React from 'react';
import styled from 'styled-components/macro';

type Props = {
  isInline?: boolean;
  size?: 'small' | 'medium' | 'large';
};

const Wrapper = styled.span<Props>`
  display: ${p => (p.isInline ? 'inline-block' : 'block')};
  padding: 5px 15px;
  width: ${p => (p.isInline ? 'auto' : '100%')};
  text-align: center;

  img {
    ${p => p.size === 'small' && 'width: 20%;'}
    ${p => p.size === 'medium' && 'width: 45%;'}
    ${p =>
      p.size === 'large' && 'width: 80%;'}
  }
`;

export default function Logo(props: Props) {
  return (
    <Wrapper size={props.size || 'small'} isInline={props.isInline}>
      <img src="./img/SPLogo.png" alt="SquidPay logo" />
    </Wrapper>
  );
}
