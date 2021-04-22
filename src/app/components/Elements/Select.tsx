/**
 * Select Element
 * Props will be passed down to the native select tag
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import FormElementStyle from './FormElementsStyle';

const Wrapper = styled.div`
  ${FormElementStyle} // basic css style for all form elements
  padding: 0;
  position: relative;

  .arrow {
    position: absolute;
    top: 50%;
    right: 5px;
    transform: translateY(-50%);
    z-index: 1;
  }

  select {
    padding: 13px 28px 13px 13px;
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

export default function SelectComponent({ children, ...rest }) {
  return (
    <Wrapper className="select-wrapper">
      <select {...rest}>{React.Children.toArray(children)}</select>
      <FontAwesomeIcon className="arrow" icon="caret-down" />
    </Wrapper>
  );
}
