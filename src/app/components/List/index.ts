/**
 * List container ie: <ul> or <ol>
 * Usage: <List></List> or <List as="ol"></List>
 */
import styled from 'styled-components/macro';
import { StyleConstants } from 'styles/StyleConstants';

const List = styled.ul<{
  divider?: boolean;
  padding?: string;
  margin?: string;
  bordertop?: boolean;
  listStyle?: string;
}>`
  list-style: ${p => (p.listStyle ? p.listStyle : 'none')};
  margin: ${p => (p.margin ? p.margin : '0 0')};
  padding: ${p => (p.padding ? p.padding : '0 0')};
  border-top: ${p =>
    p.bordertop ? `1px solid ${StyleConstants.borderColor}` : '0'};

  ${p =>
    p.divider &&
    `
    li {
      border-bottom: 1px solid ${StyleConstants.borderColor};
    }
  `}
`;

export default List;
