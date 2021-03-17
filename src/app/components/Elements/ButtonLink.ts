/**
 * Link that has button style
 */
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';

import ButtonStyle from './ButtonStyle';

const ButtonLink = styled(Link)`
  ${ButtonStyle}
`;

export default ButtonLink;
