import styled from 'styled-components/macro';
import { StyleConstants } from 'styles/StyleConstants';

type Props = {
  align?: string;
  formError?: boolean;
};

const ErrorMsg = styled.span<Props>`
  display: block;
  width: 100%;
  text-align: ${p => (p.align ? p.align : 'left')};
  font-size: ${p => (p.formError ? '0.8rem' : 'inherit')};
  color: ${p => (p.formError ? StyleConstants.BUTTONS.danger.main : 'inherit')};
`;

export default ErrorMsg;
