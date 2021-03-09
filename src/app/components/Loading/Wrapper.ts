import styled from 'styled-components/macro';

interface Props {
  position?: string;
}

const Wrapper = styled.div<Props>`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: ${p => (p.position ? p.position : 'relative')};

  ${p =>
    p.position &&
    `
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255,255,255,.5);
  `}

  img {
    width: 300px;
  }
`;

export default Wrapper;
