import styled, { css } from 'styled-components';

import { StyleConstants } from 'styles/StyleConstants';

export const Wrapper = styled.section<{
  isBoolean?: boolean;
}>`
  background: #fff;
  border-radius: 10px;
  width: 930px;
  margin: 0 auto;

  ${({ isBoolean }) =>
    !isBoolean &&
    css`
      outline: none;
      cursor: default;
    `}
`;

export const TransactionHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid #e7eaf2;

  h3 {
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    margin: 0;
  }
`;

export const TransactionContent = styled.div<{
  width?: string;
}>`
  padding: 20px;
  margin: 0 auto;

  h3 {
    margin: 0;
  }

  ${({ width }) =>
    width &&
    css`
      width: ${width};
    `}
`;

export const ButtonContainer = styled.div<{
  direction?: string;
  margin?: string;
}>`
  display: flex;

  button {
    margin-right: 12px;
    min-width: 100px;

    &:last-child {
      margin-right: 0;
    }
  }

  ${({ margin }) =>
    margin &&
    css`
      margin: ${margin};
    `}

  ${({ direction }) =>
    direction &&
    css`
      flex-direction: ${direction};

      button {
        margin-right: 0;
        margin-bottom: 10px;

        &:last-child {
          margin-bottom: 0;
        }
      }
    `}
`;

export const TransactionTitle = styled.div`
  color: #000;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  margin: 24px 0;

  p {
    color: ${StyleConstants.LABEL_TEXT};
    font-size: 12px;
    font-weight: 400;
    line-height: 18px;
    margin: 0;
  }
`;

export const TransactionList = styled.ul`
  margin: 0;
  padding: 0;
`;

export const TransactionListItem = styled.li<{
  noBorder?: boolean;
  isLast?: boolean;
}>`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e7eaf3;
  padding: 10px 0;

  ${({ isLast }) =>
    isLast &&
    css`
      border-bottom: 0;
    `}

  ${({ noBorder }) =>
    noBorder &&
    css`
      display: flex;
      align-items: center;
      justify-content: center;
      border-bottom: 0;
      padding: 20px 0;

      button {
        min-width: 150px;
      }
    `}
`;

export const ListContainer = styled.div<{
  textAlign?: string;
}>`
  ${({ textAlign }) =>
    textAlign &&
    css`
      text-align: ${textAlign};
    `}

  button {
    margin: 0;
  }
`;

export const ListTitle = styled.p<{
  isPositive?: boolean;
  isNegative?: boolean;
}>`
  font-size: 14px;
  font-weight: 400;
  line-height: 21px;
  margin: 0 0 5px;

  ${({ isPositive }) =>
    isPositive &&
    css`
      color: ${StyleConstants.POSITIVE};
    `}

  ${({ isNegative }) =>
    isNegative &&
    css`
      color: ${StyleConstants.NEGATIVE};
    `}
`;

export const ListDescription = styled.p<{
  textAlign?: string;
}>`
  margin: 0;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;

  ${({ textAlign }) =>
    textAlign &&
    css`
      text-align: ${textAlign};
    `}
`;

export const TransactionDetailsWrapper = styled.div`
  box-shadow: 0px 12px 15px rgba(140, 152, 164, 0.1);
  margin: 0 auto;
  position: relative;
  width: 382px;
`;

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

export const TransactionDetailsWrapperContent = styled.div`
  background: #faedab;
  padding: 20px;

  h6 {
    font-size: 14px;
    font-weight: 600;
    line-height: 21px;
    margin: 0 auto;
    text-align: center;
  }
`;

export const TransactionDetailsList = styled.ul`
  list-style: none;
  margin: 40px 0 60px;
  padding: 0;
`;

export const TransactionDetailsListItem = styled.li`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0;
  }

  p {
    font-size: 14px;
    font-weight: 400;
    flex: 1;
    line-height: 21px;
    margin: 0;

    &:last-child {
      font-weight: 600;
      text-align: right;
    }
  }
`;

export const FooterWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 80px 0 0;

  p {
    font-size: 12px;
    font-weight: 400;
    line-height: 18px;
    margin: 0;
  }

  img {
    width: 150px;
  }
`;

export const TotalTransactions = styled.div`
  margin: 0 auto;
  width: 150px;
  text-align: center;

  p {
    font-size: 14px;
    font-weight: 400;
    line-height: 21px;
    margin: 0;
  }

  .total {
    font-size: 18px;
    font-weight: 600;
    margin: 10px 0;
  }

  .--positive {
    color: ${StyleConstants.POSITIVE};
  }

  .--negative {
    color: ${StyleConstants.NEGATIVE};
  }
`;

export const EmptyWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  img {
    width: 150px;
  }

  h6 {
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    margin: 40px 0 10px;
  }

  p {
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
  }
`;

export const PaddingWrapper = styled.div`
  padding: 20px;
  text-align: center;

  h3,
  p {
    text-align: left;
  }

  h3 {
    font-size: 18px;
    font-weight: 400;
    line-height: 27px;
    margin: 0 0 15px;
  }

  p {
    font-size: 12px;
    font-weight: 400;
    line-height: 18px;
    margin: 0 0 70px;
  }

  button {
    margin: 50px 0 0;
  }
`;
