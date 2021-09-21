import * as React from 'react';
import styled from 'styled-components/macro';
import { StyleConstants } from 'styles/StyleConstants';

/** Title Component style */
const TitleStyle = styled.div<{ border?: boolean; padded?: boolean }>`
  padding: ${p =>
    p.padded
      ? `10px ${StyleConstants.spacing[24]}`
      : `${StyleConstants.spacing[16]} ${StyleConstants.spacing[24]}`};
  font-size: 1rem;
  font-weight: 600;
  border-bottom: ${p =>
    p.border ? `1px solid ${StyleConstants.divider}` : '0'};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;

  nav {
    flex-grow: 1;
    text-align: right;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
`;

interface TitleProps extends React.HTMLAttributes<HTMLElement> {
  text: string;
  actions?: React.ReactNode;
  border?: boolean;
}

/**
 * Title Component
 * @prop  {string}  text      Title text
 * @prop  {node}    actions   Additional action for the title component (optional) should pass a valid react node elements
 * @prop            ...rest   Rest of proper html attributes
 * @returns
 */
function Title({ text, actions, border, ...rest }: TitleProps) {
  return (
    <TitleStyle
      {...rest}
      border={border || undefined}
      padded={actions ? true : undefined}
    >
      <span>{text}</span>
      {actions && <nav>{actions}</nav>}
    </TitleStyle>
  );
}

export default Title;
