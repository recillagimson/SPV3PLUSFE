import styled from 'styled-components/macro';

const Wrapper = styled.section`
  .list-account-wrapper {
    min-height: 100px;
    .account-details {
      display: flex;
      justify-content: center;
      flex-direction: column;
      margin-left: 20px;
    }
  }

  .number {
    height: 20px;
  }

  .otp-wrapper {
    display: flex;
    align-items: center;
    max-width: 600px;
    margin: auto;
    input {
      border-radius: unset;
      border: unset;
      padding-bottom: unset;
      border-bottom: 1px solid #ced4da;
    }
    .timer {
      width: 114px;
      height: 30px;
      border: 1px solid #a9b1b8;
      text-align: center;
      display: flex;
      align-items: center;
      border-radius: 4px;
      justify-content: center;
    }
  }
`;

export default Wrapper;
