/**
 * Input Element
 * NOTE: this element should always be in full width,
 *       to make this element in an inline manner, wrap it in a element
 *       common style use for input element
 *       extend this style if necessary
 */
import styled from 'styled-components/macro';
import FormElementStyle from './FormElementsStyle';

const Input = styled.input`
  ${FormElementStyle}// basic css style for all form elements
`;

export default Input;
