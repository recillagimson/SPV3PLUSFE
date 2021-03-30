import styled from 'styled-components/macro';

import { media } from 'styles/media';

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 110px;
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

  .agreement {
    input[type='checkbox'],
    span {
      display: inline-block;
      vertical-align: top;
    }

    input[type='checkbox'] {
      cursor: pointer;
    }

    span {
      width: calc(100% - 25px);
    }

    a {
      font-weight: 600;
      text-decoration: none;
      color: inherit;
      transition: all 0.3s ease;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  ${media.large`
    .form-container {
      max-width: 500px;
    }
  `}
`;

export default Wrapper;
