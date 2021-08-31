import styled from 'styled-components/macro';
import { StyleConstants } from 'styles/StyleConstants';
// import { css } from 'styled-components/macro';

// const valueDescription = css`
//   font-size: 13px;
//   display: block;
//   margin: 5px 0px;
//   font-weight: 500;
// `;

const Wrapper = styled.section`
  .product-list {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #e7eaf3;
    padding: 15px 15px;
    cursor: pointer;
    border-radius: ${StyleConstants.BORDER_RADIUS};

    &:hover {
      background-color: #e7eaf3;
    }

    &:first-child {
      border-top: 1px solid #e7eaf3;
    }
  }

  .review-details {
    p {
      margin: 5px 0;
    }
  }

  .active {
    background-color: #e7eaf3;
  }

  .pills {
    cursor: pointer;
    white-space: nowrap;
    width: 99%;
    overflow: auto;
    margin-bottom: 5px;
  }
`;

export default Wrapper;
