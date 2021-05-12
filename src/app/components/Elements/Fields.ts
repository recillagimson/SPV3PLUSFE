/**
 * Form separating input fields
 * @prop {string}   padding
 * @prop {string}   margin
 * @prop {boolean}  flex          will show a flex ui with default widths for 1st element
 */
import styled from 'styled-components/macro';
import { media } from 'styles/media';

type FieldProps = {
  padding?: string;
  margin?: string;
  flex?: boolean;
};

const Field = styled.div<FieldProps>`
  margin: ${p => (p.margin ? p.margin : '0 0 20px')};
  padding: ${p => (p.padding ? p.padding : '0 0')};
  font-size: inherit;
  position: relative;

  ${media.medium`
    display: ${p => (p.flex ? 'flex' : 'block')};

    ${p =>
      p.flex &&
      `
      align-items: flex-start;
      justify-content: flex-start;

      & > label {
        font-size: 1rem;
        padding-top: 13px;
        max-width: 200px;
        min-width: 200px;
      }
    `}
  `}
`;

export default Field;
