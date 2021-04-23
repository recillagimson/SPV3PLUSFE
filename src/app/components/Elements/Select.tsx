/**
 * Select Element
 * Props will be passed down to the native select tag
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import FormElementStyle from './FormElementsStyle';

const Wrapper = styled.div<{ full?: boolean }>`
  ${FormElementStyle} // basic css style for all form elements
  width: ${p =>
    p.full ? '100%' : 'auto'};
  margin-right: ${p => (!p.full ? '15px' : '0')};
  padding: 0;
  position: relative;

  .arrow {
    position: absolute;
    top: 50%;
    right: 7px;
    transform: translateY(-50%);
    z-index: 1;
  }

  select {
    padding: 13px 25px 13px 13px;
    background-color: transparent;
    appearance: none;
    position: relative;
    z-index: 2;
    width: 100%;
    border: 0;
    outline: 0;
  }

  // remove the arrow of select for lower version of ie
  select::-ms-expand {
    display: none;
  }
`;

interface SelectComponentProps extends React.HTMLAttributes<any> {
  fullWidth?: boolean;
  children: React.ReactNodeArray | React.ReactNode;
  value: any;
  onChange: (o: any) => void;
}

export default function SelectComponent({
  fullWidth,
  children,
  value,
  onChange,
  ...rest
}: SelectComponentProps) {
  return (
    <Wrapper className="select-wrapper" full={fullWidth}>
      <select {...rest}>{children}</select>
      <FontAwesomeIcon className="arrow" icon="caret-down" />
    </Wrapper>
  );
}
