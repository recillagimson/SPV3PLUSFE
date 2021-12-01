/**
 * Input Element
 * NOTE: this element should always be in full width,
 *       to make this element in an inline manner, wrap it in a element
 *       common style use for input element
 *       extend this style if necessary
 */
import styled from 'styled-components/macro';
import FormElementStyle from './FormElementsStyle';

const Input = styled.input<{ hidespinner?: boolean; error?: boolean }>`
  ${FormElementStyle} // basic css style for all form elements
  width: 100%;
  display: block;

  &[type='date']::-webkit-calendar-picker-indicator {
    cursor: pointer;
  }

  // this will set to hide the spinner if input type is number
  // hidespinner should be declare in the <Input /> tag
  ${p =>
    p.hidespinner &&
    `
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    
    &[type=number] {
      -moz-appearance: textfield;
    }
    &[type=number] {
      appearance: textfield;
    }
  `}
`;

export default Input;
