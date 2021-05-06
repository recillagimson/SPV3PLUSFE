/**
 * Renders SquidPay Logo
 * @prop {boolean}  isInline  if render the image inlined with the content (default: block)
 * @prop {enum}     size      Selection of small, medium, large
 */
import * as React from 'react';
import styled from 'styled-components/macro';

type LogoProps = {
  isInline?: boolean;
  size?: 'small' | 'medium' | 'large';
};

const Wrapper = styled.span<LogoProps>`
  display: ${p => (p.isInline ? 'inline-block' : 'block')};
  padding: 5px 15px;
  width: ${p => (p.isInline ? 'auto' : '100%')};
  text-align: center;

  img {
    ${p => p.size === 'small' && 'width: 150px'};
    ${p => p.size === 'medium' && 'width: 250px'};
    ${p => p.size === 'large' && 'width: 450px'};
  }
`;

export default function Logo(props: LogoProps) {
  return (
    <Wrapper size={props.size || 'small'} isInline={props.isInline}>
      <img src="./img/SPLogo.png" alt="SquidPay logo" />
    </Wrapper>
  );
}
