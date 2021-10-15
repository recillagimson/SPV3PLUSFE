import styled, { css } from 'styled-components';

export const CuttedImageWrapper = styled.img`
  &:first-child {
    position: absolute;
    top: -7px;
    width: 100%;
  }

  &:last-child {
    position: absolute;
    bottom: -7px;
    width: 100%;
  }
`;

export const ReviewTotal = styled.div`
  margin: 40px 0 0;
  width: 100%;

  p {
    margin: 0;
    text-align: center;
  }

  .total-description,
  .service-fee {
    font-size: 14px;
    font-weight: 400;
    font-style: normal;
    line-height: 21px;
  }

  .total-amount {
    font-size: 18px;
    font-weight: 800;
    line-height: 27px;
    margin: 10px 0;
  }

  .service-fee {
    margin-bottom: 40px;
  }

  button {
    margin: 40px 0 0;
  }
`;

export const ReviewListItem = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 10px;
  width: 100%;

  &:last-child {
    margin-bottom: 0;
  }

  p {
    font-size: 14px;
    font-weight: 400;
    font-style: normal;
    line-height: 21px;
    margin: 0;
    /* width: 45%; */

    &:last-child {
      text-align: right;
      padding-left: 10px;
      /* width: 53%; */
    }
  }
`;

export const ConfirmationMessage = styled.p`
  font-size: 14px;
  font-weight: 400;
  font-style: normal;
  line-height: 21px;
  margin: 10px 0 0;
`;

export const DetailsWrapper = styled.div<{
  padding?: string;
}>`
  ${({ padding }) =>
    padding &&
    css`
      padding: ${padding};
    `}
`;

export const SuccessWrapper = styled.div`
  box-shadow: 0px 12px 15px rgba(140, 152, 164, 0.1);
  margin: 10px auto 20px;
  position: relative;
  background: #faedab;
  padding: 20px;

  display: flex;
  align-items: center;
  flex-direction: column;

  .success-message {
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
    margin-top: 20px;
  }

  .date {
    font-size: 12px;
    font-weight: 400;
    font-style: normal;
    line-height: 18px;
    margin: 5px 0;
  }
`;
