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
  margin?: string;
};

const Wrapper = styled.span<LogoProps>`
  display: ${p => (p.isInline ? 'inline-block' : 'block')};
  padding: 3px 5px;
  width: ${p => (p.isInline ? 'auto' : '100%')};
  text-align: center;
  margin: ${p => (p.margin ? p.margin : '0 0')};

  img {
    ${p => p.size === 'small' && 'width: 150px'};
    ${p => p.size === 'medium' && 'width: 220px'};
    ${p => p.size === 'large' && 'width: 450px'};
  }
`;

export default function Logo(props: LogoProps) {
  return (
    <Wrapper
      size={props.size || 'small'}
      isInline={props.isInline}
      margin={props.margin || undefined}
      className="logo"
    >
      <img
        src={`${process.env.PUBLIC_URL}/img/SPLogo.png`}
        alt="SquidPay logo"
      />
    </Wrapper>
  );
}
