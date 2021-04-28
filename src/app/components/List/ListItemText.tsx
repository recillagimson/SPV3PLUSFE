/**
 * Component to render a set of text
 * Refer to Figma design like in transaction history or notifications page
 *
 * @prop {string}   primary       Primary text
 * @prop {string}   caption       caption text
 * @prop {string}   secondary     Secondary texts
 * @prop {boolean}  small         if defined, will render a smaller size font
 * @prop {string}   align         one of 'left' | 'right' | 'center' : default: 'left'
 * @prop {boolean}  bold          will display a bold title
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { StyleConstants } from 'styles/StyleConstants';

import Label from 'app/components/Elements/Label';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface TypographyProps extends React.HTMLAttributes<any> {
  label?: string;
  primary: string;
  secondary?: string;
  caption?: string;
  small?: boolean;
  align?: 'left' | 'right' | 'center';
  bold?: boolean;
  icon?: boolean; // Show Arrow Icon
}

const Wrapper = styled.div<{ small?: boolean; align?: string; icon?: boolean }>`
  font-size: ${p => (p.small ? '0.8rem' : '1rem')};
  text-align: ${p => (p.align ? p.align : 'left')};
  position: relative;
  padding-top: 12px;
  padding-bottom: 12px;
  padding-right: ${p => (p.icon ? '35px' : '0')};

  &[role='presentation'] {
    cursor: pointer;
  }

  .svg-inline--fa {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
  }

  small {
    max-width: ${p => (p.small ? '100px' : '120px')};
  }
`;

const Primary = styled.p<{ bold?: boolean }>`
  font-size: 1em;
  font-weight: ${p => (p.bold ? '700' : '500')};
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
  label,
  primary,
  secondary,
  caption,
  small,
  align,
  bold,
  icon,
  ...rest
}: TypographyProps) {
  return (
    <Wrapper
      small={small || undefined}
      align={align || undefined}
      icon={icon || undefined}
      {...rest}
    >
      {Boolean(label) && <Label>{label}</Label>}
      {Boolean(primary) && (
        <Primary bold={bold || undefined}>{primary}</Primary>
      )}
      {Boolean(caption) && <Caption>{caption}</Caption>}
      {Boolean(secondary) && <Secondary>{secondary}</Secondary>}
      {icon && <FontAwesomeIcon icon="chevron-right" />}
    </Wrapper>
  );
}
