import styled from 'styled-components/macro';

type Props = {
  size?: 'small' | 'medium';
};

const sizes = {
  small: '50%',
  medium: '75%',
};

const Wrapper = styled.div<Props>`
  width: ${p => (p.size ? sizes[p.size] : '100%')};
  border: 1px solid #fff;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  background-color: white;
  .title {
    font-weight: bold;
    padding: 20px 20px;
    border-bottom: 1px solid #eee;
  }
  .body {
    padding: 20px 20px;
    flex: 1;
  }
  .footer {
    border-top: 1px solid #eee;
    padding: 15px 20px;
  }
`;

export default Wrapper;
