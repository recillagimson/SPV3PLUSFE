/**
 * Component to render a set of text
 * Refer to Figma design like in transaction history or notifications page
 *
 * @prop {string}   primary       Primary text
 * @prop {string}   caption       caption text
 * @prop {string}   secondary     Secondary texts
 * @prop {boolean}  small         if defined, will render a smaller size font
 * @prop {string}   align         one of 'left' | 'right' | 'center' : default: 'left'
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { StyleConstants } from 'styles/StyleConstants';

interface TypographyProps extends React.HTMLAttributes<any> {
  primary: string;
  secondary?: string;
  caption?: string;
  small?: boolean;
  align?: 'left' | 'right' | 'center';
}

const Wrapper = styled.div<{ small?: boolean; align?: string }>`
  font-size: ${p => (p.small ? '0.8rem' : '1rem')};
  text-align: ${p => (p.align ? p.align : 'left')};

  small {
    max-width: ${p => (p.small ? '100px' : '120px')};
  }
`;

const Primary = styled.p`
  font-size: 1em;
  font-weight: 700;
  margin: 0 0;
`;

const Secondary = styled.p`
  font-size: 0.85em;
  margin: 0 0;
`;

const Caption = styled.small`
  font-size: 0.75em;
  margin: 0 0;
  padding: 0 0;
  display: block;
  color: ${StyleConstants.LABEL_TEXT};
  white-space: pre-wrap;
  text-align: inherit;
`;

export default function TypographyComponent({
  primary,
  secondary,
  caption,
  small,
  align,
  ...rest
}: TypographyProps) {
  return (
    <Wrapper small={small || undefined} align={align || undefined} {...rest}>
      {Boolean(primary) && <Primary>{primary}</Primary>}
      {Boolean(caption) && <Caption>{caption}</Caption>}
      {Boolean(secondary) && <Secondary>{secondary}</Secondary>}
    </Wrapper>
  );
}
