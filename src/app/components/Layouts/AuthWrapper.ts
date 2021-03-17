import styled from 'styled-components/macro';

import { media } from 'styles/media';

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 60px);

  .form-container {
    border-radius: 20px;
    min-width: 300px;
    max-width: 80%;
  }

  form {
    margin: 30px 0 0;
    position: relative;

    .icon-btn {
      position: absolute;
      top: 5px;
      right: 5px;
    }

    input[type='checkbox'] {
      margin-right: 7px;
      margin-top: 3px;
    }

    button[type='submit'] {
      margin: 15px 0 10px;
    }

    span {
      font-size: 0.85rem;
    }
  }

  .flex {
    display: flex;
    align-items: flex-start;
  }

  ${media.large`
    .form-container {
      max-width: 500px;
    }
  `}
`;

export default Wrapper;
