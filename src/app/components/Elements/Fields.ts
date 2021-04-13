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

    & > * {
      flex: 1 0 100%;
    }
  `}
`;

export default Field;
