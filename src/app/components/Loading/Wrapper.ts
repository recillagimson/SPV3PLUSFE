import styled from 'styled-components/macro';

interface Props {
  position?: string;
  big?: boolean;
  invert?: boolean;
}

const Wrapper = styled.div<Props>`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: ${p => (p.position ? p.position : 'relative')};
  padding: 20px;

  ${p =>
    p.position !== 'relative' &&
    `
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${p.invert ? 'rgba(0,0,0,.2)' : 'rgba(255,255,255,.4)'};
    z-index: 2000;
  `}

  img {
    width: ${p => (p.big ? '200px' : '120px')};
  }
`;

export default Wrapper;
