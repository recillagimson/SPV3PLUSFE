/**
 * List container ie: <ul> or <ol>
 * Usage: <List></List> or <List as="ol"></List>
 */
import styled from 'styled-components/macro';
import { StyleConstants } from 'styles/StyleConstants';

const List = styled.ul<{ divider?: boolean }>`
  list-style: none;
  margin: 0 0;
  padding: 20px 25px;

  ${p =>
    p.divider &&
    `
    li {
      border-bottom: 1px solid ${StyleConstants.LIGHT_BORDER_COLOR};
    }
  `}
`;

export default List;
