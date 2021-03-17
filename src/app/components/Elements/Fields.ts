/**
 * Form separating input fields
 * @prop {string}   padding
 * @prop {string}   margin
 */
import styled from 'styled-components/macro';

type Props = {
  padding?: string;
  margin?: string;
};

const Field = styled.div<Props>`
  margin: ${p => (p.margin ? p.margin : '0 0 20px')};
  padding: ${p => (p.padding ? p.padding : '0 0')};
  font-size: inherit;
  position: relative;
`;

export default Field;
