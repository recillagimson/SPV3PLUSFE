import { css } from 'styled-components/macro';
import { StyleConstants } from 'styles/StyleConstants';

/**
 * Basic Style for form elements ie: input, select, textarea
 * NOTE: if all elements will share the same design, modify this
 *       if not, extend this style, and add your css on the elements styled-component ie: Input.ts
 */
const FormElementStyle = css`
  background-color: ${StyleConstants.WHITE};
  border-radius: ${StyleConstants.BORDER_RADIUS};
  border: 1px solid ${StyleConstants.BORDER_COLOR};
  padding: 15px;
  color: ${StyleConstants.MAIN_TEXT};
  display: block;
  width: 100%;
  outline: none;
  font-size: inherit;

  &:hover {
    border-color: ${StyleConstants.BUTTONS.neutral.dark};
  }

  &:focus {
    border-color: ${StyleConstants.GOLD};
  }

  &.error {
    border-color: ${StyleConstants.BUTTONS.danger.dark};
  }
`;

export default FormElementStyle;
