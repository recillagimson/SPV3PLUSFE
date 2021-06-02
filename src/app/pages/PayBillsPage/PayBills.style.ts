import styled, { css } from 'styled-components';

import { StyleConstants } from 'styles/StyleConstants';

export const Wrapper = styled.section<{
  isBoolean?: boolean;
}>`
  background: ${StyleConstants.WHITE};
  border-radius: 10px;
  width: 900px;
  margin: 0 auto;

  ${({ isBoolean }) =>
    !isBoolean &&
    css`
      outline: none;
      cursor: default;
    `}
`;

export const WrapperHeader = styled.div<{
  isCustom?: boolean;
}>`
  padding: 20px;
  border-bottom: 1px solid ${StyleConstants.LIGHT_BORDER_COLOR};

  h3 {
    color: #38434d;
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    margin: 0;
  }

  ${({ isCustom }) =>
    isCustom &&
    css`
      display: flex;
      justify-content: space-between;
      align-items: center;

      input {
        width: 300px;
      }
    `}
`;

export const WrapperContent = styled.div`
  padding: 20px;

  .title {
    font-size: 16px;
    line-height: 24px;
    font-weight: 400;
    color: ${StyleConstants.MAIN_TEXT};
    margin: 0 0 25px;
  }
`;

export const BillersOptions = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
`;

export const BillerOptionsItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  cursor: pointer;
  width: 12%; // For 9 columns 2 rows biller options

  img {
    width: 50px;
  }

  p {
    color: ${StyleConstants.LABEL_TEXT};
    font-size: 12px;
    line-height: 18px;
    font-weight: 400;
    margin: 0 0 15px;
  }
`;

export const BillersList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
`;

export const BillersListItem = styled.li`
  border: 1px solid #efefef;
  border-radius: 10px;
  cursor: pointer;
  padding: 15px;
  margin-bottom: 15px;

  display: flex;
  align-items: center;

  &:last-child {
    margin-bottom: 0;
  }

  img {
    width: 100px;
    margin-right: 20px;
  }

  p {
    color: ${StyleConstants.LABEL_TEXT};
    font-size: 12px;
    line-height: 18px;
    font-weight: 400;
    margin: 0;
    text-transform: capitalize;
  }
`;

export const FormWrapper = styled.form`
  margin: 20px 0;
`;

export const FormFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 50px;

  button {
    margin-right: 10px;
    width: 150px;

    &::last-child {
      margin-right: 0;
    }
  }
`;

export const FieldSubtext = styled.span`
  font-size: 12px;
  font-weight: 400;
  font-style: normal;
  line-height: 18px;
`;