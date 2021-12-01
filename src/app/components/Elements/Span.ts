import styled from 'styled-components/macro';
import { StyleConstants } from 'styles/StyleConstants';

const colors = {
  default: StyleConstants.body.text,
  primary: StyleConstants.color.primaryyellow,
  secondary: StyleConstants.color.gray2,
  mute: StyleConstants.color.gray4,
  danger: StyleConstants.color.tones.red,
  success: StyleConstants.color.tones.green,
};

const Span = styled.span<{
  color?: 'primary' | 'secondary' | 'mute' | 'danger' | 'success';
}>`
  font-size: inherit;
  font-weight: inherit;
  color: ${p => (p.color ? colors[p.color] : colors['default'])};
`;

export default Span;
