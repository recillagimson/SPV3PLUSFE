/**
 * List Item
 * To be used in conjuction with List (index.ts)
 *
 * @prop {boolean}  divider     If true, will show a bottom border
 * @prop {string}   flex        if defined, will make the container into a flex display: default: block
 *
 * This component extends the type props of Flex in `app/components/Elements/Flex';
 */
import styled, { css } from 'styled-components/macro';

import { FlexProps } from 'app/components/Elements/Flex';

interface ListItemProps extends FlexProps {
  flex?: boolean;
}

const flexStyles = css<ListItemProps>`
  align-items: ${p => (p.alignItems ? p.alignItems : 'center')};
  justify-content: ${p => (p.justifyContent ? p.justifyContent : 'flex-start')};
  flex-direction: ${p => (p.direction ? p.direction : 'row')};
`;

const ListItem = styled.li<ListItemProps>`
  display: ${p => (p.flex ? 'flex' : 'block')};

  ${p => p.flex && flexStyles}
  padding: 10px 0;
`;

export default ListItem;
