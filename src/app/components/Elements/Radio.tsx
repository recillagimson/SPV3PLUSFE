import * as React from 'react';
import styled from 'styled-components/macro';
import { StyleConstants } from 'styles/StyleConstants';

const Wrapper = styled.label`
  display: inline-flex;
  align-items: center;
  margin: 3px 5px;
  vertical-align: middle;
  cursor: pointer;
  user-select: none;

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;

    &:checked ~ .check {
      border-color: ${StyleConstants.LABEL_TEXT};
      &:after {
        display: block;
      }
    }

    &:disabled ~ .check {
      background-color: ${StyleConstants.GRAY_BG};
    }
  }

  .check {
    display: inline-block;
    width: 16px;
    height: 16px;
    border-width: 1px;
    border-style: solid;
    border-color: ${StyleConstants.GRAY_TEXT};
    border-radius: ${StyleConstants.BORDER_RADIUS};
    background-color: ${StyleConstants.WHITE};
    margin-right: 3px;
    position: relative;

    &:after {
      content: '';
      position: absolute;
      display: none;
      left: 2px;
      top: 2px;
      width: 10px;
      height: 10px;
      border-radius: ${StyleConstants.BORDER_RADIUS};
      background-color: ${StyleConstants.LABEL_TEXT};
    }
  }
`;

interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  text?: string;
}

/**
 * Checkbox
 * NOTE: all attributes must be a valid input attributes as this will be just passed down to the input element
 */
export default function RadioComponent({
  text,
  id,
  children,
  ...rest
}: RadioProps) {
  return (
    <Wrapper>
      <input type="radio" {...rest} />
      <span className="check" />
      {children}
    </Wrapper>
  );
}
