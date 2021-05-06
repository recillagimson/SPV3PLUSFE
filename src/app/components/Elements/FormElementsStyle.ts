import { css } from 'styled-components/macro';
import { StyleConstants } from 'styles/StyleConstants';

/**
 * Basic Style for form elements ie: input, select, textarea
 * NOTE: if all elements will share the same design, modify this
 *       if not, extend this style, and add your css on the elements styled-component ie: Input.ts
 */
const FormElementStyle = css<{ error?: boolean }>`
  background-color: ${StyleConstants.WHITE};
  border-radius: ${StyleConstants.BORDER_RADIUS};
  border: 1px solid ${StyleConstants.BORDER_COLOR};
  padding: 13px;
  color: ${StyleConstants.MAIN_TEXT};
  outline: none;
  font-size: inherit;

  &:hover {
    border-color: ${StyleConstants.BUTTONS.neutral.dark};
  }

  &:focus {
    border-color: ${StyleConstants.GOLD};
  }

  ${p =>
    p.error &&
    `& {
      border-color: ${StyleConstants.BUTTONS.danger.dark};
    }`}

  &.error {
    border-color: ${StyleConstants.BUTTONS.danger.dark};
  }
`;

export default FormElementStyle;
