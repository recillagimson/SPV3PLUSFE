/**
 * Checkbox Custom UI
 * @prop  {function}    onChange      callback for onChange event handler in input type (up to parent to control the checked value)
 * @prop  {boolean}     checked       if checked
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StyleConstants } from 'styles/StyleConstants';

const Label = styled.label`
  margin: 0 5px 0 0;
  overflow: hidden;
  text-align: left;
  display: inline-block;
  width: auto;

  svg {
    height: 20px;
    color: ${StyleConstants.BORDER_COLOR};
  }

  input {
    display: none;
    width: 0;
    height: 0;
    visibility: none;
    text-indent: -9999em;

    &[onchange] + span {
      cursor: pointer;
    }

    &:checked + span svg {
      color: #007bff;
    }
  }
`;

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked: boolean;
}

export default function Checkbox({
  onChange,
  checked,
  ...rest
}: CheckboxProps) {
  return (
    <Label>
      <input type="checkbox" onChange={onChange} checked={checked} {...rest} />
      <span>
        <FontAwesomeIcon
          pull="left"
          icon={checked ? 'check-square' : 'square'}
        />
      </span>
    </Label>
  );
}
