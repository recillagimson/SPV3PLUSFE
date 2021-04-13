import styled from 'styled-components/macro';

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 60px);

  small {
    display: block;
    color: #526372;
    margin-top: 5px;
    font-weight: lighter;
  }
`;

export default Wrapper;
