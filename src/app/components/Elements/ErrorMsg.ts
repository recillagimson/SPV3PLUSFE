import styled from 'styled-components/macro';
import { StyleConstants } from 'styles/StyleConstants';

type Props = {
  align?: string;
  formError?: boolean;
};

const ErrorMsg = styled.span<Props>`
  display: block;
  width: 100%;
  padding: ${p => (p.formError ? '2px 0 0' : '10px 0')};
  text-align: ${p => (p.align ? p.align : 'left')};
  font-size: ${p => (p.formError ? '0.75rem' : 'inherit')};
  color: ${p => (p.formError ? StyleConstants.BUTTONS.danger.main : 'inherit')};
  white-space: pre-wrap;
`;

export default ErrorMsg;
